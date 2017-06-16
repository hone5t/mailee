var editor;
var smtpSettings;
function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
   });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("submit").addEventListener("click", popup);
});

function loadChange(event)
{
    $.ajax({
        url : $('#frm').attr('action'),
        method : "get",
        dataType:"html",
        data: $('#frm').serialize(),
        async: true,
        crossDomain: true
    }).done(function(data){
        $('#result').html(data);
    });
}
$(document).ready(function(){
    setOptions();
    ace.require("ace/ext/language_tools");
    editor = ace.edit("editor");
    editor.session.setMode("ace/mode/html");
    editor.setTheme("ace/theme/xcode");
    editor.setOptions({
           enableBasicAutocompletion: true,
           enableSnippets: true,
           enableLiveAutocompletion: false
   });
    $('#preview').click(function(e){
        loadChange(e);  
    });
    $('input').change(function(e){
        loadChange(e);
    });
    editor.getSession().on('change', function(e) {
        $('#msg').val(editor.getValue());
    });
    
});
function getOptions () {
    chrome.storage.sync.get('maileeOptions',(obj)=>{
        smtpSettings = obj;
    });
}
