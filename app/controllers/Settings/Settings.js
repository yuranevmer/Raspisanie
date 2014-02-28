var args = arguments[0] || {};


(function init(){
    var directions = require("directions");
    
    var pickerData = [];
    _.each(directions, function(el) {
        var row = Ti.UI.createPickerRow({
            title: el.name,
            value : el.value
        });
        pickerData.push(row);
    });  
    $.picker.add(pickerData);
    
    
    var id = Ti.App.Properties.getInt("direction_id", 4);
    var initRow = _.find(directions, function(el){
       return el.value == id; 
    });
    $.picker.setSelectedRow(0, directions.indexOf(initRow), true);
    
})();



function close(){
    $.root.close({animated: true});
}

function save(){
    var row = $.picker.getSelectedRow(0);
    
    Ti.App.Properties.setString("direction_name", row.title);
    Ti.App.Properties.setInt("direction_id", row.value);
    
    Ti.App.fireEvent("settings:reload");
    close();
}
