var express = require('express');
var app = express();

//  HTTP method나 route에 상관없이 서버에 요청이 올 때마다 무조건 콜백함수가 실행됨
app.use(express.static(__dirname + '/public')); // __dirname은 node.js에서 프로그램이 실행중인 파일의 위치를 나타내는 global variable
// '현재_위치/public' route를 static폴더로 지정하라는 명령어
// 즉 '/'에 접속하면 '현재_위치/public'를, '/css'에 접속하면 '현재_위치/public/css'를 연결해줌
// static route에 접근할 때, 특별히 파일 이름을 지정해 주지 않으면 자동으로 index.html 파일을 찾게 됩니다.
// 즉 '/'에 접속하면 '현재_위치/pulbic/index.html' 파일을 연결하게 됩니다.

var port = 3000;
app.listen(port, function() {
    console.log('SERVER ON! http://localhost:'+port);
});
