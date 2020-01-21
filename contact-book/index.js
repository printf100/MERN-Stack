var express = require('express');
var mongoose = require('mongoose');
var app = express();

// DB setting
// mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다. 이 부분이 바뀔 일은 왠만하면 없기 때문에 그냥 항상 저렇게 설정하고 쓰시면 됩니다.
// 이 부분이 빠지게 되면 서버 실행시 경고를 냅니다.
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// process.env 오브젝트 : node.js에서 기본으로 제공되는 환경변수들을 가지고 있는 객체
// connection string을 "MONGO_DB"라는 이름의 환경변수에 저장하였기 때문에 process.env.MONGO_DB로 해당 값을 불러올 수 있습니다.
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;   // db object를 가져와 db 변수에 넣음

// db가 성공적으로 연결된 경우 출력
db.once('open', function() {
    console.log('DB connected');
});

// db 연결 중 에러가 발생한 경우 출력
db.on('error', function(err) {
    console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Port setting
app.listen(3000, function() {
    console.log('SERVER ON! http://localhost:' + 3000);
});
