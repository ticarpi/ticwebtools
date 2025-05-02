#! /bin/bash
target=$1
results=()
for vuln in `curl $target 2>/dev/null | grep -o -e "SNYK-JS-[A-Z]\{1,20\}-[0-9]\{1,9\}\|npm:.\{1,20\}:[0-9]\{1,9\}" | sort -u | sort -n`
do
	curl https://security.snyk.io/vuln/$vuln 2>/dev/null | grep -o -e "CVE-.\{4\}-[0-9]\{1,6\}" | sort -u
done
