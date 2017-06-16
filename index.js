var express = require('express');
var src = process.cwd() + '/public/stylesheets';
var fs = require('fs');
var EmailBuilder = require('email-builder-core');
var emailBuilder = new EmailBuilder({relativePath:src});
var app = express();
var ejs = require('ejs');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


function createResponse(response,payload) {
    response.writeHead(200);
    file = fs.readFileSync(  './views/index.ejs', 'utf-8');
    template = ejs.render(file,payload);
    emailBuilder.inlineCss(template)
    .then((html)=>{
       response.write(html);
       response.end(); 
    })
}
app.post('/', function(request,response){
    ///todo: complete post method
});
app.get('/', function(request, response) {
    payload = {
        preheader        : 'this will show up only in the email agent',
        title            : "Your email received",
        intro            : "thank you for your email",
        msg              : `<p>we will respond once we process your request</p>
                            we receive the following info
                            <ul>
                                <li> name  : sam al geznae</li>
                                <li> phone : not gonna put it here lol </li>
                                <li> job title : Software Developer </li>
                            </ul>`,
        action_text      : "Visit Repo",
        action_link      : "https://github.com/hone5t/mailee",
        footer_content   : "to unsbscribe please click <a href='#'>here</a>",
        link_footer      : "https://github.com/hone5t",
        link_footer_name : "My Work",
    };
    // text = response.render('index');
    response.setHeader('Content-Type', 'text/html');
    createResponse(response,payload);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


