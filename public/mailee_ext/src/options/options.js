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


function restore_options() {
  chrome.storage.sync.get('maileeOptions',(obj)=>{
    options = obj;
    document.getElementById('username').value = obj.username || '';
    document.getElementById('password').value = obj.password || '';
    document.getElementById('host').value     = obj.host || '';
    document.getElementById('email').value    = obj.email || '';
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let host     = document.getElementById('host').value;
  let email    = document.getElementById('email').value;
  let options  = {
    email    : email,
    username : username,
    password : password,
    host     : host
  };

  restore_options(options);
  document.getElementById('save').addEventListener('click',
      ()=>{save_options(options)});
} );

