// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


var dataFolder = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,"i");
var resFolder = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "i");
if (!dataFolder.exists()) {
    var dossier = require("dossier");
    dossier.copy(resFolder.nativePath, dataFolder.nativePath);
    
    var j = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory+ "/html/", "jquery-2.1.0.min.js");
    var o = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "jquery.js");
    if (!o.exists()) {
        o.createFile();
        o.write(j);
    }
}




function isiOS7Plus()
{
    // iOS-specific test
    if (Titanium.Platform.name == 'iPhone OS')
    {
        var version = Titanium.Platform.version.split(".");
        var major = parseInt(version[0],10);
        if (major >= 7)
        {
            return true;
        }
    }
    return false;
}
Alloy.Globals.iOS7 = isiOS7Plus();
Alloy.CFG.top = Alloy.Globals.iOS7 ? 20 : 0;
Alloy.Globals.top = Alloy.Globals.iOS7 ? 20 : 0;
Ti.API.info('cfg.top', Alloy.CFG.top);

