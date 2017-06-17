var editor;
var smtpSettings = {};
function popup(data,status,xhr) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id , {"data": data});
   });
}
    
function loadChange(event,options)
{
    options.data = $('#frm').serialize();
    $.ajax(options).done(function(data){
        //console.log('successful request'+data);
    });
}


function setOptions () {
    chrome.storage.sync.get('maileeOptions',(obj)=>{
        smtpSettings = obj;
    });
}

$(document).ready(function(){
    setOptions();
    let options = {
        url : $('#frm').attr('action'),
        method : "get",
        dataType:"html",
        async: true,
        crossDomain: true,
        success: (data,textStatus,jqXHR)=>{$('#result').html(data);}
    }
    editor = ace.edit("editor");
    $('#preview').click(function(e){
        loadChange(e,options);  
    });
    $('input').change(function(e){
        loadChange(e,options);
    });
    editor.getSession().on('change', function(e) {
        $('#msg').val(editor.getValue());
        loadChange(e,options);
    });
    $('#get-template-btn').click(function(e){
        options.method   = "post";
        options.dataType = "text";
        options.success  = (data,textStatus,jqXhr)=>{popup(data,textStatus,jqXhr)};
        loadChange(e,options);
    });
});

