var express = require('express');
var app = express();

// ejs를 사용하기 위해 express의 view engine에 ejs를 set
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// query를 통해서 이름을 받음 (모든 query들은 req.query에 저장됨)
app.get("/hello", function(req, res) {
    res.render("hello", {name:req.query.nameQuery});    // 첫번째 parameter로 ejs의 이름을 전달
    // res.render 함수는 ejs를 /views 폴더에서 찾으므로 views폴더의 이름은 변경되면 안됨!!!
});

// route parameter를 통해 이름을 받음
app.get("/hello/:nameParam", function(req, res) {   // 콜론(:)으로 시작되는 route는 해당부분의 텍스트가 req.params에 저장됨
    res.render("hello", {name:req.params.nameParam});   // 두번째 parameter로 ejs에서 사용될 Object를 전달
});

app.listen(3000, function() {
    console.log('SERVER ON!');
});
