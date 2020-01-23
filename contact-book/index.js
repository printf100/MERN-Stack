var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

db.once('open', function() {
    console.log('DB connected');
});

db.on('error', function(err) {
    console.log('DB ERROR : ', err);
});


// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(methodOverride('_method'));


// Routes setting
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));


// Port setting
app.listen(3000, function() {
    console.log('SERVER ON! http://localhost:' + 3000);
});
