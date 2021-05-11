const express = require("express");
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

var connection = mysql.createConnection({
    host: "localhost",
    user: "root", //mysql의 id
    password: "1111", //mysql의 password
    database: "groupware", //사용할 데이터베이스 각자 바꿔서 사용해요!!
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// 회원가입 sql쿼리
app.post("/signUp", (req, res) => {
    const user = req.body;

    connection.query("INSERT INTO USERS(reg_ID, userEMAIL, userID, userPWD, userNAME, userADDR, userTELL, userSSN, userDATE)"
        + " values (?,?,?,?,?,?,?,?,?)"
        , [user.id, user.email, user.id, user.pass, user.uName, user.addr, user.tell, user.ssn, user.comeIn],
        function (err, rows, fields) {
            if (err) {
                console.log("회원가입 실패");
                console.log(err);
                connection.rollback();
            } else {
                console.log("회원가입 성공");
                console.log(rows);
                connection.commit();
            }

        });
});

//아이디 중복체크 쿼리
app.post('/idCheck', (req, res) => {
    const user = req.body;

    connection.query("SELECT userID FROM USERS WHERE userID = (?)", [user.id],
        function (err, rows, fields) {
            if (err) {
                console.log("아이디 중복체크 실패");
                console.log(err);
                connection.rollback();
            } else {
                console.log("아이디 중복체크 성공");
                console.log(rows);
                res.send(rows);
                connection.commit();
            }

        });
});

//직원조회 쿼리
app.post("/u-mgnt", (req, res) => {

    connection.query("SELECT userID, userNAME, userRANK, userSSN, userTELL, userADDR, userDATE, userEXIT, exit_DATE FROM USERS",
        function (err, rows, fields) {
            if (err) {
                console.log("직원조회 실패");
                console.log(err);
                connection.rollback();
            } else {
                console.log("직원조회 성공");
                console.log(rows);
                res.send(rows);
                connection.commit();
            }
        });
});




app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
})