var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');    // method-override 모듈 담기
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

app.use(methodOverride('_method')); // _method의 query로 들어오는 값으로 HTTP method를 바꿈


// DB의 구조
var contactSchema = mongoose.Schema({
    name: {type:String, required:true, unique: true},
    email: {type:String},
    phone: {type:String}
});
var Contact = mongoose.model('contact', contactSchema); // contactSchema의 model 생성


// Routes setting
// Home
app.get('/', function(req, res) {
    res.redirect('/contacts');
});

// Contacts - Index
app.get('/contacts', function(req, res) {
    // 모델.find 함수 : DB에서 검색조건에 맞는 모델 데이터를 찾고 함수 호출
    Contact.find({}, function(err, contacts) {  // {} : 빈 Object -> DB에서 Contact 모델의 모든 데이터를 리턴
                                    // contacts : 검색결과는 한개 이상이므로 array -> contact의 복수형을 사용
        if(err)
            return res.json(err);
        res.render('contacts/index', {contacts:contacts});  // views/contacts/index.ejs를 render
    });
});

// Contacts - New
app.get('/contacts/new', function(req, res) {
    res.render('contacts/new');     // views/contacts/new.ejs를 render
});

// Contacts - Create
app.post('/contacts', function(req, res) {
    // 모델.create 함수 : DB에 데이터를 생성하는 함수
    Contact.create(req.body, function(err, contact) {   // req.body : 생성할 데이터의 Object
        if(err)
            return res.json(err);
        res.redirect('/contacts');
    });
});

// Contacts - Show
app.get('/contacts/:id', function(req, res) {
    Contact.findOne({_id: req.params.id}, function(err, contact) {
        if(err)
            return res.json(err);
        res.render('contacts/show', {contact:contact});
    });
});

// Contacts - Edit
app.get('/contacts/:id/edit', function(req, res) {
    Contact.findOne({_id: req.params.id}, function(err, contact) {
        if(err)
            return res.json(err);
        res.render('contacts/edit', {contact:contact});
    });
});

// Contacts - Update
app.put('/contacts/:id', function(req, res) {
    Contact.findOneAndUpdate({_id: req.params.id}, req.body, function(err, contact) {
        if(err)
            return res.json(err);
        res.redirect('/contacts/' + req.params.id);
    });
});

// Contacts - Destroy
app.delete('/contacts/:id', function(req, res) {
    Contact.deleteOne({_id: req.params.id}, function(err) {
        if(err)
            return res.json(err);
        res.redirect('/contacts');
    });
});


// Port setting
app.listen(3000, function() {
    console.log('SERVER ON! http://localhost:' + 3000);
});
