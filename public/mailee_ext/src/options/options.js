// Saves options to chrome.storage.sync.
function save_options(options) {
  console.log(options);
  chrome.storage.sync.set({"maileeOptions" : options}, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function getOptionValues()
{
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
  return options;
}
function restore_options(options) {
  chrome.storage.sync.get('maileeOptions',(obj)=>{
    document.getElementById('username').value = obj.maileeOptions.username || '';
    document.getElementById('password').value = obj.maileeOptions.password || '';
    document.getElementById('host').value     = obj.maileeOptions.host || '';
    document.getElementById('email').value    = obj.maileeOptions.email || '';
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  restore_options(getOptionValues());
  document.getElementById('save').addEventListener('click',
      ()=>{save_options(getOptionValues())});
} );

