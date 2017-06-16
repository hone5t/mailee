chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    let template = document.getElementsByName('template')[0];
    if (typeof template == "undefined") {
        alert("sorry cant find the template");
    } else {
        
        template.value = request.data;
    }
});

