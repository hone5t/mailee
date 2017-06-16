var express = require('express');
var src = process.cwd() + '/public/stylesheets';
var fs = require('fs');
var EmailBuilder = require('email-builder-core');
var emailBuilder = new EmailBuilder({relativePath:src});
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser')


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() ); 
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

function getPayload(obj)
{
    let payload = {
        preheader        : obj.preheader || `this will show up only in the email agent`,
        title            : obj.title || `Your email received`,
        intro            : obj.intro || `thank you for your email`,
        msg              : obj.msg || `<p>we will respond once we process your request</p>
                            we receive the following info
                            <ul>
                                <li> name  : sam al geznae</li>
                                <li> phone : not gonna put it here lol </li>
                                <li> job title : Software Developer </li>
                            </ul>`,
        action_text      : obj.action_text || `Visit Repo`,
        action_link      : obj.action_link || `https://github.com/hone5t/mailee`,
        footer_content   : obj.footer_content ||
                           `to unsbscribe please click <a href='#'>here</a>`,
        link_footer      : obj.link_footer || 
                           `https://github.com/hone5t`,
        link_footer_name : obj.link_footer_name || `My Work`
    };
    payload.link_footer = payload.link_footer.trim();
    payload.action_link = payload.action_link.trim();
    return payload;
}

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
    response.setHeader('Content-Type', 'text');
    payload = getPayload(request.body);
    createResponse(response,payload);
});
app.get('/', function(request, response) {
    payload = getPayload(request.query);
    response.setHeader('Content-Type', 'text/html');
    createResponse(response,payload);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


