const express = require("express"); 
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용
// const router = express.Router();

// router.get('/', cors(), (req, res) => { res.send('cors!') });


var connection = mysql.createConnection({
    host : "localhost",
    user : "root", //mysql의 id
    password : "1111", //mysql의 password
    database : "groupware", //사용할 데이터베이스 각자 바꿔서 사용해요!!
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// app.post("/idplz", (req,res)=>{
//     const test = req.body.test;
//     // console.log(req.body);
//     connection.query("INSERT INTO test values (?)",[test],
//     function(err,rows,fields){
//         if(err){
//             console.log("실패");
//             // console.log(err);
//         }else{
//             console.log("성공");
//             // console.log(rows);
//         };
//     });
// });

app.post("/Login", (req,res)=>{
    const id = req.body.id;
    const pass = req.body.pass;
    connection.query("select COUNT(userid) ming from USERS where userID=(?) and userPWD=(?)",[id,pass],
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("불러오기 성공");
            res.send(rows);
            console.log(rows);
            console.log(id,pass);
        }
    })
})


app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})