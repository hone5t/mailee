// Saves options to chrome.storage.sync.
function save_options(options) {
  console.log("saving settings");
  chrome.storage.sync.set({ maileeOptions :{
      options
  }
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get('maileeOptions',(obj)=>{
     options = obj;
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let smtp     = document.getElementById('smtp').value;
  let host     = document.getElementById('host').value;
  let options  = {
    username : username,
    password : password,
    smtp     : smtp,
    host     : host
  };

  restore_options(options);
  document.getElementById('save').addEventListener('click',
      ()=>{save_options(options)});
} );

