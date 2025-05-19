#!/bin/bash

# Check if an input file was provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 target_list_file"
    exit 1
fi

# Check if the file exists
if [ ! -f "$1" ]; then
    echo "Error: File '$1' not found!"
    exit 1
fi

# Create a timestamp-named summary file in the current directory
timestamp=$(date +"%Y%m%d_%H%M%S")
summary_file="./${timestamp}_snyk_results.txt"
echo "# VULNERABILITY SCAN SUMMARY" > "$summary_file"
echo "# Generated: $(date)" >> "$summary_file"
echo "# Target file: $1" >> "$summary_file"
echo "" >> "$summary_file"

# Function to safely process URLs
process_url() {
    local url="$1"
    # Trim whitespace
    url=$(echo "$url" | tr -d '[:space:]')
    
    # Check if URL has scheme
    if [[ ! "$url" =~ ^https?:// ]]; then
        url="http://$url"
    fi
    
    # URL encode any special characters
    url=$(echo "$url" | sed 's/ /%20/g; s/\[/%5B/g; s/\]/%5D/g; s/{/%7B/g; s/}/%7D/g')
    
    echo "$url"
}

# Process each target
while IFS='' read -r target || [[ -n "$target" ]]; do
    # Skip empty lines and comments
    [[ -z "$target" || "$target" =~ ^[[:space:]]*# ]] && continue
    
    echo "Processing $target..."
    
    # Process the URL safely
    processed_target=$(process_url "$target")
    echo "Processed URL: $processed_target"
    
    # Initialize summary data for this target
    target_summary=""
    target_summary+="\n-+-+-+-+-+-+-+-+-\n## Target: $target\n"
    
    # Execute curl with better error handling
    response=$(curl -sSL --max-time 10 -w "\nSTATUS_CODE:%{http_code}" "$processed_target" 2>&1)
    curl_result=$?
    
    # Extract status code and check for errors
    status_code=$(echo "$response" | grep "STATUS_CODE:" | cut -d":" -f2)
    
    echo "HTTP Status code: $status_code"
    
    if [ $curl_result -ne 0 ]; then
        echo "Error: curl command failed with exit code $curl_result"
        case $curl_result in
            3) echo "URL malformed. Check URL format: $processed_target" ;;
            6) echo "Could not resolve host" ;;
            7) echo "Failed to connect to host" ;;
            28) echo "Operation timed out" ;;
            *) echo "Other curl error. See 'man curl' for details" ;;
        esac
        target_summary+="- ERROR: curl failed with exit code $curl_result\n"
        echo -e "$target_summary" >> "$summary_file"
        echo "------------------------"
        continue
    fi
    
    if [ -z "$status_code" ] || [ "$status_code" != "200" ]; then
        echo "Error: Failed to fetch $processed_target (Status code: ${status_code:-unknown})"
        target_summary+="- ERROR: HTTP Status ${status_code:-unknown}\n"
        echo -e "$target_summary" >> "$summary_file"
        echo "------------------------"
        continue
    fi
    
    # Extract content part
    content=$(echo "$response" | sed '/STATUS_CODE:/,$d')

	# Extract current version and compare
	currentversion=$(echo "$content" | grep -o -e "latest version<.\{1,100\}item value.\{1,100\}<\!--]-->" | grep -o "\-\->.\{1,10\}<\!\-\-" | tr -d "\<\>\!\-")
	checkversion=$(echo "$processed_target" | rev | cut -d"/" -f1 | rev)

		
    # Extract vulnerability IDs
    vulns=$(echo "$content" | grep -o -e "SNYK-[A-Z]\{1,20\}-[A-Z]\{1,20\}-[0-9]\{1,9\}\|npm:.\{1,20\}:[0-9]\{1,9\}" | sort -u)
    
    if [ -z "$vulns" ]; then
        echo "No vulnerabilities found for $processed_target"
        target_summary+="\n### No vulnerabilities found\n"
		if [[ "$checkversion" == "$currentversion" ]]; then
			echo "This is the current version ($currentversion)"
			target_summary+="\n### Version check:\nRunning the current version ($currentversion)\n"
			echo -e "$target_summary" >> "$summary_file"
			echo "------------------------"
			continue
		else
			echo "This is an outdated version (running on $checkversion - update to $currentversion)"
			target_summary+="\n### Version check:\nRunning an outdated version (running on $checkversion - update to $currentversion)\n"
			echo -e "$target_summary" >> "$summary_file"
			echo "------------------------"
			continue
		fi
        echo -e "$target_summary" >> "$summary_file"
        echo "------------------------"
        continue
    fi
    
    vuln_count=$(echo "$vulns" | wc -l)
    echo "Found vulnerabilities: $vuln_count"
    target_summary+="\n### Found $vuln_count vulnerabilities\n"
    
    # Collect all CVEs for this target
    all_target_cves=""
    
    # Process each vulnerability
    for vuln in $vulns; do
        echo "Checking vulnerability: $vuln"
        
        # Construct vulnerability URL
        vuln_url="https://security.snyk.io/vuln/$vuln"
        
        # Fetch vulnerability details with better error handling
        vuln_response=$(curl -sSL --max-time 10 -w "\nSTATUS_CODE:%{http_code}" "$vuln_url" 2>&1)
        vuln_curl_result=$?
        
        vuln_status=$(echo "$vuln_response" | grep "STATUS_CODE:" | cut -d":" -f2)
        
        echo "  Vulnerability lookup status code: $vuln_status"
        
        if [ $vuln_curl_result -ne 0 ]; then
            echo "  Error: curl command failed with exit code $vuln_curl_result for vulnerability $vuln"
            target_summary+="- Vulnerability: $vuln (https://security.snyk.io/vuln/$vuln)\n"
            target_summary+="  * Error fetching details (curl exit code: $vuln_curl_result)\n"
            continue
        fi
        
        if [ -z "$vuln_status" ] || [ "$vuln_status" != "200" ]; then
            echo "  Error: Failed to fetch details for $vuln (Status code: ${vuln_status:-unknown})"
            target_summary+="- Vulnerability: $vuln (https://security.snyk.io/vuln/$vuln)\n"
            target_summary+="  * Error fetching details (HTTP status: ${vuln_status:-unknown})\n"
            continue
        fi
        
        # Extract content part
        vuln_content=$(echo "$vuln_response" | sed '/STATUS_CODE:/,$d')
        
        # Find CVEs
        cves=$(echo "$vuln_content" | grep -o -e "CVE-.\{4\}-[0-9]\{1,6\}" | sort -u)
        
        # Format CVEs as comma-separated list for summary
        if [ -n "$cves" ]; then
            cves_comma=$(echo "$cves" | paste -sd "," -)
            echo "  Found CVEs: $cves_comma"
            target_summary+="- Vulnerability: $vuln (https://security.snyk.io/vuln/$vuln)\n"
            target_summary+="  * CVEs: $cves_comma\n"
            
            # Add to the all_target_cves list
            all_target_cves="$all_target_cves $cves"
        else
            echo "  No CVEs found for vulnerability $vuln"
            target_summary+="- Vulnerability: $vuln (https://security.snyk.io/vuln/$vuln)\n"
            target_summary+="  * No CVEs found\n"
        fi
    done
    
    # Add a dedicated section with one CVE per line if any were found
    if [ -n "$all_target_cves" ]; then
        # Remove duplicates and sort
        unique_cves=$(echo "$all_target_cves" | tr ' ' '\n' | sort -u)
        
        target_summary+="\n### CVEs for copy/paste:\n"
        # First list one CVE per line
        while read -r cve; do
            [ -n "$cve" ] && target_summary+="$cve\n"
        done <<< "$unique_cves"
        
        # Then add comma-separated list
        cves_comma_all=$(echo "$unique_cves" | paste -sd "," - | sed 's/^,//')
        target_summary+="\n### CVEs comma-separated:\n"
        target_summary+="$cves_comma_all\n"
    fi

	# Report on version checks
    if [[ "$checkversion" == "$currentversion" ]]; then
        echo "This is the current version ($currentversion)"
        target_summary+="\n### Version check:\nRunning the current version ($currentversion)\n"
        echo -e "$target_summary" >> "$summary_file"
        echo "------------------------"
		continue
	else
		echo "This is an outdated version (running on $checkversion - update to $currentversion)"
        target_summary+="\n### Version check:\nRunning an outdated version (running on $checkversion - update to $currentversion)\n"
        echo -e "$target_summary" >> "$summary_file"
        echo "------------------------"
		continue
    fi

    echo -e "$target_summary" >> "$summary_file"
    echo "------------------------"
done < "$1"

# Display the summary
echo ""
echo ""
echo ""
echo "==============================================="
echo "          VULNERABILITY SCAN SUMMARY           "
echo "==============================================="
echo ""
cat "$summary_file"
echo ""
echo "Summary saved to: $summary_file"

echo "Scan completed."
exit 0