chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    let formTemplate = document.getElementsByName('template')[0]  ;
    let storeTemplate = document.getElementsByName('contents')[0] ;
    if (formTemplate == "undefined" && typeof storeTemplate == "undefined" ) {
        alert("sorry cant find the template");
    } else {
        template = formTemplate || storeTemplate;
        template.value = request.data;
    }
});

