//imports
var express = require('express');
var cors = require('cors');
var path = require('path')
var cluster = require('cluster');
var cookieParser = require('cookie-parser');
var db = require('./models/db');
var users = require('./routes/user');

// task
var task=require("./routes/tasksroute")
var Apps = require('./routes/Appsdata');
var form=require('./routes/formsender')
var image= require('./routes/image');
var upload= require('./routes/upload');
var page = require('./routes/page');
var pub= require('./routes/public');
var fav= require('./routes/favicon');
var getsitemap= require('./routes/seo').getsitemapxml;
var getrobots= require('./routes/seo').getrobotstxt;
var seoupdate= require('./routes/seo').updateSeo;
var framework= require('./routes/framework');
var login =require('./routes/login').login;
var logout =require('./routes/login').logout;
var ChangePass =require('./routes/login').ChangePass;
var UpdatePass =require('./routes/login').UpdatePass;
var getpages =require('./routes/cms').getpages;
var getpagedetails =require('./routes/cms').getpagedetails;
var updatepage =require('./routes/cms').updatepage;
var newpage =require('./routes/cms').newcustompage;
var publish =require('./routes/cms').mangepage;
var publishnav=require('./routes/cms').publishnav
var getcss= require('./routes/cms').getcss;
var getheader= require('./routes/cms').getheader;
var getfooter= require('./routes/cms').getfooter;
var savecss= require('./routes/cms').savecss;
var saveheader= require('./routes/cms').saveheader;
var savefooter= require('./routes/cms').savefooter;
var resetcontents= require('./routes/cms').resetcontents;
var undopage= require('./routes/cms').undopage;
var storereq= require('./routes/store').checkstore;
var updatestore= require('./routes/store').updatedomain;
var createstore= require('./routes/store').createstore;
var gettemplates=require('./routes/store').gettemplates;
var logger = require('./libs/logger.js');
var fbpartners = require('./routes/fbpartners');
var fbescalation = require('./routes/fbescalation');
var fbpartnersloan = require('./routes/fbpartnersloan');
var fbpartnersapi = require('./routes/fbpartnerapi');
var partnersapi = require('./routes/partnersapi');
var Ecommerce = require('./routes/Ecommerce');
var fbpartnersfinance = require('./routes/fbpartnersfinance');
var fbExternallead = require('./routes/fbExternallead');
var fbpartnersdam = require('./routes/fbpartnerdam');
var fbpartnerlead = require('./routes/fbpartnerlead');
var fbloanconfig= require('./routes/fbloanconfig');
var fbflow= require('./routes/fbflow');
var fbpartnersticket = require('./routes/fbpartnersticket');
var fbassetmanager=require('./routes/fbassetmanager');

//var cospacelocation = require('./routes/locationrouter');
/******************app routes start******************** */

/************************************************* */
var compression = require('compression');
var loaddata = require('./libs/viewpath').populatesites;
var numCPUs = require('os').cpus().length;
var bodyParser = require('body-parser');
var http = require('http');
app = express();
var oneDay = 86400000;
app.engine('ejs', require('ejs').__express);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'rack'));
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use('/static',express.static(path.join(__dirname, 'rack/static'),{ maxAge: oneDay})); 
app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb'}));

app.root= __dirname;

app.livestores=[];
new loaddata(function(err,docs)
{
 if (err) return console.error('in'+err);
 if(docs!=null) app.livestores.push(docs)
  
});
 
//cluster
if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  var timeouts = [];
  function errorMsg() {
    console.error("Something must be wrong with the connection ...");
  }

  cluster.on('fork', function(worker) {
    timeouts[worker.id] = setTimeout(errorMsg, 2000);
  });
  cluster.on('listening', function(worker, address) {
    clearTimeout(timeouts[worker.id]);
  });
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker %d died (%s). restarting...',
      worker.process.pid, signal || code);
    cluster.fork();
  });
} 
else 
{  
  app.use("/",task);
  app.use('/', users);
  app.use('/', Apps);
  app.use('/',form);   

  app.use('/',fbpartners);
  app.use('/',fbescalation);
  app.use('/',fbpartnersloan);
  app.use('/',fbpartnersfinance);
  app.use("/",fbpartnersapi);
  app.use("/",partnersapi);
  app.use("/",Ecommerce);
  app.use('/',fbpartnerlead);
  app.use("/",fbpartnersdam);
  app.use("/",fbExternallead);
  app.use("/",fbloanconfig);
  app.use("/",fbflow);
  app.use("/",fbpartnersticket);
  app.use("/", fbassetmanager);
  app.use('/images',image);
  app.use('/upload',upload); 
  app.use('/favicon.ico',fav);
  app.use('/seo/update',seoupdate);
  app.use('/sitemap.xml',getsitemap);
  app.use('/robots.txt',getrobots);   
  app.use('/',page);

  app.get('/public/*',pub);
  app.get('/framework/*',framework);
  app.post('/login',login); 
  app.post('/Account/logout',logout); 
  app.post('/changepassword',ChangePass);
  app.post('/Account/update',UpdatePass)
  app.use('/cms/getpages',getpages);
  app.use('/cms/Pagedetails/:pagename',getpagedetails)
  app.use('/cms/reset/:content',resetcontents);
  app.get('/cms/getcss',getcss);
  app.get('/cms/getheader',getheader);
  app.get('/cms/getfooter',getfooter);
  app.post('/cms/updatepage',updatepage);
  app.post('/cms/savecss',savecss);
  app.post('/cms/saveheader',saveheader);
  app.post('/cms/savefooter',savefooter);
  app.post('/cms/publish',publish);
  app.post('/cms/undo/:pagename',undopage);
  app.post('/cms/newpage',newpage);
  app.post('/cms/publishnav',publishnav)
  app.post('/stores/checkstore',storereq);
  app.post('/stores/createstore',createstore);
  app.post('/stores/updatestore',updatestore);
  app.post('/stores/gettemplates',gettemplates)

  app.use(function(err, req, res, next) {
    
    res.status(err.status || 500);
    console.log(err+1);
    res.send('yougoterror');
  });

  var server = http.createServer(app);

  server.listen(80,function(){
    logger.info('server started');
  });
}