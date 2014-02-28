
function switchDirection(){
    if ($.sv.currentPage == 0) {
        $.sv.scrollToView(1);
    } else {
        $.sv.scrollToView(0);
    }
};

function openSettings(){
    var c = Alloy.createController("Settings/Settings",{});
    c.getView().open({modal: true});
}





(function init() {
     var cache1 = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "cache1.html");
     var cache2 = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "cache2.html");
     if (cache1.exists() && cache2.exists()){
         $.web1.url = cache1.nativePath;
         $.web2.url = cache2.nativePath;
     } else {
         loadAndCache();
     }
})();


Ti.App.addEventListener("settings:reload", function(e){
   loadAndCache(); 
});





function loadAndCache() {
    loadContent(function(e){
        Ti.API.info('e=',e);
        var output1 = prepareContent(e.content1);
        var output2 = prepareContent(e.content2);
        
        var cache1 = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "cache1.html");
        var cache2 = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "cache2.html");
        if (!cache1.exists()) {
            cache1.createFile();
        }
        if (!cache2.exists()) {
            cache2.createFile();
        }
        cache1.write(output1);
        $.web1.url = cache1.nativePath;
        cache2.write(output2);
        $.web2.url = cache2.nativePath;
    });
}



function loadContent(callback) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "/html/", "parcer.html");
    Ti.API.info('file', file.exists());
    var output = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "parcer.html");
    if (!output.exists()) {
        output.createFile();
    }
    var str = file.read().text;
    str = str.replace("{{url}}", makeURL());
    output.write(str);
    
    
    var webView = Ti.UI.createWebView({
        opacity: 0,
        url : Ti.Filesystem.applicationDataDirectory + "/parcer.html"
    });
    $.root.add(webView);
    Ti.App.addEventListener("parcer:loaded", onLoad);
    function onLoad(e){
        alert("load event")
        $.root.remove(webView);
        webView = null;
        //alert(e);
        callback(e);
    }
    
    
    function makeURL(){
        //"http://swrailway.gov.ua/timetable/eltrain/?gid=1&rid=4&reverse=0&startPicker=2014-02-20&dateR=0&lng="
        var url = "http://swrailway.gov.ua/timetable/eltrain/?gid=1&rid=" + Ti.App.Properties.getInt("direction_id", 4);
        Ti.API.info('url', url);
        return url;
    }

}



function prepareContent(content) {
    var templateFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "/html", "template.html");
    var data = templateFile.read();
    var tmp = data.text;
    
    tmp = tmp.replace("{{table-content}}", content);
    tmp = tmp.replace(/\/img/g,"i");
    tmp = tmp.replace(/\"pix\"/g, "\"pix ppix\"");
    tmp = tmp.replace(/\"pix2\"/g, "\"pix2 ppix2\"");
    tmp = tmp.replace('\"left\"', '\"left left2\"');
    tmp = tmp.replace('width="195"', 'width="40%"');
    tmp = tmp.replace("overflow-x: scroll; width:640px", "overflow-x: scroll; overflow-y: hidden; -webkit-overflow-scrolling: touch; width:60%; position:absolute; top:0px; left:40%;");
    
    
    //overflow-x: scroll; 
    return tmp;
}


$.root.open();

