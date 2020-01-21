// require(모듈_이름) : node.js에서 기본적으로 주어지는 함수, modules폴더 안에 설치된 모듈을 불러옴
var express = require('express');   // 설치한 express module을 불러와서 변수(express)에 담기
var app = express();    // express를 실행하여 app Object 초기화 (Express framework에서 항상 가장 처음하는 것)

// 서버에 get요청이 있는 경우,
app.get('/', function(req, res) {   // req : request에 관련된 값들과 함수들이 저장되어 있는 object. HTTP request header, 요청 url, cookies, query, body 등의 정보가 저장되어 있다.
                                    // res : response에 관련된 값들과 함수들이 저장되어 있는 object. HTTP response header, cookies, HTTP code 등의 정보를 확인하고 값을 변경할 수도 있다.
    res.send('Hello World!');
});

var port = 3000;    // 사용할 포트 번호
// 서버가 실행되는 경우,
app.listen(port, function() {   // 포트에 node.js 서버 연결
    console.log('SERVER ON! http://localhost:'+port);
});