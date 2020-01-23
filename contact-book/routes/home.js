var express = require('express');
var router = express.Router();  // Router 함수 초기화

// Home
router.get('/', function(req, res) {
    res.redirect('/contacts');
});

module.exports = router;    // router 오브젝트가 모듈이되어 require시에 사용됨!