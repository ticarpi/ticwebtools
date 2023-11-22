/*
Check for JavaScript-accessible DOM content and other resources - for exfiltration and exploitation
Script by @ticarpi
Paste this whole script into the browser console and hit ENTER to run.
The output is dumped as a JSON document which you can analyse in your favourite text/code editor.
*/

var JSattack_master_list = [];
var JSattack_var_list = {variables: [], functions: [], objects: [], other: []};
var JSattack_commonvar_list = [];
var JSattack_cookies_list = []
var JSattack_common_vars = ["$","$$","$0","$1","$2","$3","$4","0","1","2","2f1acc6c3a606b082e5eef5e54414ffb","ASRouterAddParentListener","ASRouterMessage","ASRouterRemoveParentListener","Color","ColorUtils","ContentSearchHandoffUIController","ContentSearchUIController","CssFlags","Gemini","HSLAInterface","HSLInterface","HSVInterface","HexInterface","InstallTrigger","JSCompiler_renameProperty","MSANTracker","Modernizr","NONCE_ID","NewtabRenderUtils","OneTrust","OneTrustStub","OnetrustActiveGroups","Optanon","OptanonActiveGroups","Perf","PropTypes","RGBAInterface","RGBInterface","RPMAddMessageListener","RPMRemoveMessageListener","RPMSendAsyncMessage","React","ReactDOM","ReactRedux","ReactTransitionGroup","Redux","ShadyCSS","Telemetry","__BROWSERTOOLS_CONSOLE","__BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC","__BROWSERTOOLS_CONSOLE_INTELLISENSE_DESCRIPTOR","__BROWSERTOOLS_CONSOLE_INTELLISENSE_GET_DESCRIPTOR","__BROWSERTOOLS_CONSOLE_SAFEFUNC","__BROWSERTOOLS_DEBUGGER","__BROWSERTOOLS_DOMEXPLORER_ADDED","__BROWSERTOOLS_EMULATIONTOOLS_ADDED","__BROWSERTOOLS_MEMORYANALYZER_ADDED","__BROWSERTOOLS_NETWORK_TOOL_ADDED","__isReactDndBackendSetUp","__tcfapi","_authCookieName","_cbid","_getAppPerfTrace","_isWebWorkerPresent","_jsLoaderAsyncCanary","_llic","_pageTimings","_perfMarker","_perfMeasure","_secondaryPageTimings","_webWorkerBundle","alert","applicationCache","atob","awa","behaviorKey","binding","blur","btoa","caches","cancelAnimationFrame","cancelIdleCallback","captureEvents","cd","chrome","chromeCart","clearInterval","clearTimeout","clientInformation","close","closed","confirm","console","cookieStore","cookieSyncComepleted","cr","createImageBitmap","crossOriginIsolated","crypto","customElements","data","dataLayer","defaultStatus","defaultstatus","define","devicePixelRatio","dir","document","drive","dump","esImport","event","external","fetch","find","focus","frameElement","frames","fullScreen","gContentSearchController","g_ashsC","g_hsSetup","generateUUID4","getComputedStyle","getCookieConsentRequired","getDefaultComputedStyle","getSelection","globalLeft","hasPreHydrateState","history","imgTTAF","indexedDB","innerHeight","innerWidth","isSecureContext","jQuery","length","loadDeferredImages","loadTimeData","loader","localStorage","location","locationbar","matchMedia","menubar","mojo","mojoBase","moveBy","moveTo","mozInnerScreenX","mozInnerScreenY","mscc","name","navigator","newGuid","newTabPage","onErrorHandler","onabort","onabsolutedeviceorientation","onafterprint","onanimationcancel","onanimationend","onanimationiteration","onanimationstart","onappinstalled","onauxclick","onbeforeinstallprompt","onbeforeprint","onbeforeunload","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontextmenu","oncuechange","ondblclick","ondevicelight","ondevicemotion","ondeviceorientation","ondeviceorientationabsolute","ondeviceproximity","ondrag","ondragend","ondragenter","ondragexit","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onformdata","ongotpointercapture","onhashchange","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onlanguagechange","onload","onloadeddata","onloadedmetadata","onloadend","onloadstart","onlostpointercapture","onmessage","onmessageerror","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onmozfullscreenchange","onmozfullscreenerror","onoffline","ononline","onpagehide","onpageshow","onpause","onplay","onplaying","onpointercancel","onpointerdown","onpointerenter","onpointerleave","onpointermove","onpointerout","onpointerover","onpointerrawupdate","onpointerup","onpopstate","onprogress","onratechange","onrejectionhandled","onreset","onresize","onscroll","onsearch","onseeked","onseeking","onselect","onselectionchange","onselectstart","onstalled","onstorage","onsubmit","onsuspend","ontimeupdate","ontoggle","ontransitioncancel","ontransitionend","ontransitionrun","ontransitionstart","onunhandledrejection","onunload","onuserproximity","onvolumechange","onvrdisplayactivate","onvrdisplayconnect","onvrdisplaydeactivate","onvrdisplaydisconnect","onvrdisplaypresentchange","onwaiting","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkittransitionend","onwheel","open","openDatabase","opener","opr","origin","originAgentCluster","otIabModule","otStubData","outerHeight","outerWidth","pageXOffset","pageYOffset","parent","performance","personalbar","populateAutosuggestResponse","postMessage","pp","print","promoBrowserCommand","prompt","queueMicrotask","releaseEvents","requestAnimationFrame","requestIdleCallback","require","resizeBy","resizeTo","screen","screenLeft","screenTop","screenX","screenY","scroll","scrollBy","scrollByLines","scrollByPages","scrollMaxX","scrollMaxY","scrollTo","scrollX","scrollY","scrollbars","search","select","self","sessionStorage","setInterval","setResizable","setTimeout","showDirectoryPicker","showOpenFilePicker","showSaveFilePicker","sidebar","sizeToContent","skia","speechSynthesis","status","statusbar","stop","styleMedia","taskModule","telemetryEventsClear","telemetryEventsFlush","toolbar","top","trustedTypes","u2f","updateCommands","url","utils","visualViewport","webWorker","webkitCancelAnimationFrame","webkitRequestAnimationFrame","webkitRequestFileSystem","webkitResolveLocalFileSystemURL","webkitStorageInfo","webpackJsonp","window","windowsPerfMarker","gaGlobal","gaData","Goog_AdSense_getAdAdapterInstance","Goog_AdSense_OsdAdapter","google_measure_js_timing","googleToken","googleIMState","processGoogleToken","__google_ad_urls_id","google_unique_id","__google_ad_urls","google_osd_loaded","google_onload_fired","ampInaboxIframes","ampInaboxPendingMessages","GoogleGcLKhOms","Goog_Osd_UnloadAdBlock","Goog_Osd_UpdateElementToMeasure","google_osd_amcb","google_image_requests","googletag","_qevents","_comscore","GoogleAnalyticsObject","ga","google_tag_data","gaplugins","ggeac","google_js_reporting_queue","JSattack_commonvar_list","JSattack_custom_list","JSattack_current_vars","JSattack_currentnum","JSattack_current","JSattack_common_vars","JSattack_master_list","JSattack_var_list","JSattack_commonvar_list","JSattack_output","JSattack_cookie","JSattack_cookies_list","JSattack"];
var JSattack_current_vars = Object.keys(window);
for(var JSattack_currentnum in JSattack_current_vars ) {   
        JSattack_current = JSattack_current_vars[JSattack_currentnum]
        if(JSattack_common_vars.indexOf(JSattack_current) > -1){
            JSattack_commonvar_list.push(JSattack_current);
        }
        else {
            if(typeof(window[JSattack_current]) === "string"){
                JSattack_var_list.variables.push({[JSattack_current]: window[JSattack_current]});
            }
            else if(typeof(window[JSattack_current]) === "object"){
                try {
                    JSattack_var_list.objects.push({[JSattack_current]: JSON.stringify(window[JSattack_current])});
                }
                catch {
                    JSattack_var_list.objects.push({[JSattack_current]: "Could not stringify JS Object"});
                }
            }
            else if(typeof(window[JSattack_current]) === "function"){
                JSattack_var_list.functions.push({[JSattack_current]: "Function"});
            }
            else {
                JSattack_var_list.other.push({[JSattack_current]: window[JSattack_current]});
            };
            
        }
    };
JSattack_cookies_list = document.cookie.split(/; */);
JSattack_master_list.push({cookies: JSattack_cookies_list});
JSattack_master_list.push({sessionStorage: sessionStorage});
JSattack_master_list.push({localStorage: localStorage});
JSattack_master_list.push({variables: JSattack_var_list});
JSattack_master_list.push({HTMLDoc: {DocHead: document.head.outerHTML, DocBody: document.body.outerHTML}});
var JSattack_output = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());
JSattack_output(JSattack_master_list, 'JSattackOutput.json');
