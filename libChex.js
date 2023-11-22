/*
Check JavaScript Library versions loaded into a web application
Script by @ticarpi
(Updated May 19th 2023)
Run in browser console by pasting:
libChex = document.createElement("script"); libChex.src = "https://YOURSITE/libChex.js"; document.head.appendChild(libChex);
Or if that fails (CSP blocking for example):
Paste this whole script into the browser console and hit ENTER to run.
*/
libchexvers = '1.0.0'
libs = {
'Ace':[['ace.version'],'https://security.snyk.io/package/npm/ace-builds/'],
'AngularJS':[['angular.version'],'https://security.snyk.io/package/npm/angular/'],
'Angular 2.0+':[['document.getElementsByTagName("app-root")[0].attributes["ng-version"].value'],'https://security.snyk.io/package/npm/@angular%2Fcore/'],
'Bootstrap (Major Version)':[['__bootstrap__'],'https://security.snyk.io/package/npm/bootstrap/#'],
'Bootstrap ':[['$.fn.tooltip.Constructor.VERSION'],'https://security.snyk.io/package/npm/bootstrap/'],
'CKEditor':[['CKEDITOR.version'],'https://security.snyk.io/package/npm/ckeditor/'],
'Core.js':[['core.version','globalThis[\'__core-js_shared__\'].versions[0].version','globalThis[\'__core-js_shared__\'].versions[1].version','globalThis[\'__core-js_shared__\'].versions[2].version','globalThis[\'__core-js_shared__\'].versions[3].version','globalThis[\'__core-js_shared__\'].versions[4].version','globalThis[\'__core-js_shared__\'].versions[5].version'],'https://security.snyk.io/package/npm/core-js/'],
'D3':[['d3.version'],'https://security.snyk.io/package/npm/d3/'],
'ECharts':[['echarts.version'],'https://security.snyk.io/package/npm/echarts/'],
'Ember.js':[['Ember.VERSION'],'https://security.snyk.io/package/npm/ember-source/'],
'Gatsby':[['document.getElementsByTagName(\'meta\')[\'generator\'].content.split(\' \')[1]'],'https://security.snyk.io/package/npm/gatsby/'],
'GSAP':[['gsap.version'],'https://security.snyk.io/package/npm/gsap/'],
'Hammer.js':[['Hammer.VERSION'],'https://security.snyk.io/package/npm/hammerjs/'],
'Handlebars':[['Handlebars.VERSION'],'https://security.snyk.io/package/npm/handlebars/'],
'jQuery':[['jQuery().jquery'],'https://security.snyk.io/package/npm/jquery/'],
'jQuery UI':[['jQuery.ui.version'],'https://security.snyk.io/package/npm/jquery-ui/'],
'jQuery Migrate':[['jQuery.migrateVersion'],'https://security.snyk.io/package/npm/jquery-migrate/'],
'Lodash':[['_.VERSION'],'https://security.snyk.io/package/npm/lodash/'],
'Meteor':[['Meteor.release'],'https://security.snyk.io/package/npm/meteor/'],
'Moment.js':[['moment.version'],'https://security.snyk.io/package/npm/moment/'],
'Mustache.js':[['Mustache.version'],'https://security.snyk.io/package/npm/mustache/'],
'Next.js':[['next.version','globalThis[\'next\'].version'],'https://security.snyk.io/package/npm/next/'],
'Node.js':[['process.versions'],'https://security.snyk.io/package/npm/node/'],
'Raphael':[['Raphael.version'],'https://security.snyk.io/package/npm/raphael/'],
'Snap':[['Snap.version'],'https://security.snyk.io/package/npm/snap.js/'],
'Toastr':[['toastr.version'],'https://security.snyk.io/package/npm/toastr/']
};
console.log('#=#=#=#=#=#=#=#=#=#=#=#\nStarting libChex v'+libchexvers+'\nby @ticarpi\n#=#=#=#=#=#=#=#=#=#=#=#\n------------------------------------------------------------\nChecking loaded libraries on ['+document.domain+']\n(from page: '+document.URL+')\n------------------------------------------------------------');
var libkeys = keys(libs)
var prevlibresult = ''
var supplementalchecks = ''
for(var libkeys_currentnum in libkeys) {   
        libkeys_current = libkeys[libkeys_currentnum]
	for(var currenteval in libs[libkeys_current][0]) {
		try {
			libresult = eval(libs[libkeys_current][0][currenteval])
		}
		catch {
			libresult = ''
		}
		if(libresult && prevlibresult != libresult) {
			console.log('\n'+libkeys_current+' loaded. Version seen: '+libresult);
			console.log('>  '+libs[libkeys_current][0][currenteval]+'\n<  \''+libresult+'\'');
			supplementalchecks += libs[libkeys_current][1]+libresult+'\n';
			prevlibresult = libresult
			
		}
	}
};
if(supplementalchecks) {
	console.log('\nReview the following pages for details on library versions seen:\n'+supplementalchecks)
}
else {
	console.log('[No JavaScript libraries observed from common namespaces.]')
};
console.log('\n--------------------------------------------------------------\nScanning for additional version information in \'globalThis\'...\nIf you see any new version numbers here you might want to\ncheck for them in the application or your proxy history\n--------------------------------------------------------------');
for(var globalItem in globalThis) {try {isJQueryVers = globalThis[globalItem].fn.jquery} catch {isJQueryVers = ''} if(isJQueryVers) {console.log('globalThis[\''+ globalItem +'\'] is jQuery '+isJQueryVers+'\nhttps://security.snyk.io/package/npm/jquery/'+ isJQueryVers)}};
for(var globalItem in globalThis) {try {hasVers = globalThis[globalItem].version} catch {hasVers = ''} if(hasVers) {console.log('globalThis[\''+ globalItem +'\'].version returned this version number: '+hasVers)}};
for(var globalItem in globalThis) {try {hasVers = globalThis[globalItem].VERSION} catch {hasVers = ''} if(hasVers) {console.log('globalThis[\''+ globalItem +'\'].VERSION returned this version number: '+hasVers)}};
for(var globalItem in globalThis) {try {hasVers = globalThis[globalItem].Version} catch {hasVers = ''} if(hasVers) {console.log('globalThis[\''+ globalItem +'\'].Version returned this version number: '+hasVers)}};
for(var globalItem in globalThis) {try {hasVers = globalThis[globalItem].fn.version} catch {hasVers = ''} if(hasVers) {console.log('globalThis[\''+ globalItem +'\'].fn.version returned this version number: '+hasVers)}};
console.log('\n-----------------------------------\nlibChex run completed successfully\n-----------------------------------');
