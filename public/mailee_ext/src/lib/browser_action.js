var editor;
var smtpSettings = {};

function saveToStorage(key, val) {
    // chrome.storage.sync.set({key: val}, () => {});
    if (key == 'msg' && !val){
        // dont allow the msg to be empty 
        return;
    }
    localStorage.setItem(key,val);
}

function getFromStorage(key) {
    return localStorage.getItem(key);
}

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    if( element.name) {
        data[element.name] = element.value;
        saveToStorage(element.name, element.value);
    }
    return data;
}, {});

function popup(data,status,xhr) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id , {"data": data});
   });
}


function loadChange(event,options)
{
    frm = document.getElementById('frm');
    if (options.type == "GET") {
    options.data = $('#frm').serialize();
    } else {
        options.data = JSON.stringify(formToJSON(frm.elements));
    }
    console.log(options);
    $.ajax(options).done(function(data){
        //console.log('successful request'+data);
    });
}


function setOptions () {
    chrome.storage.sync.get('maileeOptions',(obj)=>{
        smtpSettings = obj.maileeOptions;
        if (smtpSettings) {
            $('#username').val(smtpSettings.username);
            $('#password').val(smtpSettings.password);
            $('#email').val(smtpSettings.email);
        }
    });
}

$(document).ready(function(){
    setOptions();
    let options = {
        url : $('#frm').attr('action'),
        type : "GET",
        dataType:"html",
        async: true,
        crossDomain: true,
        success: (data,textStatus,jqXHR)=>{$('#result').html(data);}
    }
    variables = ['link_footer_name','link_footer','footer_content','action_link', 'action_text', 'intro', 'title', 'preheader'];
    variables.forEach((element)=>{
        if (getFromStorage(element)) {
            ele = document.getElementsByName(element)[0];
            ele.value = getFromStorage(element);
        }
    });
    editor = ace.edit("editor");
    if (localStorage.getItem('msg')) {
        editor.setValue(getFromStorage('msg'), 1);
    }

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
        options.type     = "POST";
        options.dataType = "text";
        options.headers  = {"content-type" : "application/json"};
        options.success  = (data,textStatus,jqXhr)=>{popup(data,textStatus,jqXhr)};
        loadChange(e,options);
    });
});

