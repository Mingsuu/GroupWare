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


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



/* 로그인 하기 */
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


/*아이디 찾기 */
app.post("/Findid", (req,res)=>{
    const nbox = req.body.nbox;
    const sbox = req.body.sbox;
    connection.query("select userID from USERS where userNAME=(?) and userSSN=(?)",[nbox,sbox],
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("불러오기 성공");
            res.send(rows);
            console.log(rows);
            console.log(nbox,sbox);
        }
    })
})

/*비밀번호 찾기 */
app.post("/Findpass", (req,res)=>{
    const pfbox = req.body.pfbox;
    const tfbox = req.body.tfbox;
    connection.query("select userPWD from USERS where USERID =(?) and userTELL =(?)",[pfbox,tfbox],
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("불러오기 성공");
            res.send(rows);
            console.log(rows);
            console.log(pfbox,tfbox);
        }
    })
})

/*공지사항 insert문 */
app.post("/AddNotice", (req,res)=>{
    const wtitle = req.body.wt;
    const wcontent = req.body.wc;
    const wdate = req.body.wd;
    connection.query("insert into Notice values(?, ?, ?)",[wdate,wtitle,wcontent],
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("불러오기 성공");
            res.send(rows);
            console.log(rows);
            console.log(wdate,wtitle,wcontent);
        }
    })
})

/*공지사항 select문 */
app.post("/Notice", (req,res)=>{
    connection.query("select date_format(today,'%Y-%m-%d') as ndate,ntitle,ncontent from Notice",
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("불러오기 성공");
            res.send(rows);
            console.log(rows);

// 회원가입 sql쿼리
app.post("/signUp", (req,res)=>{
    const user = req.body;
    
    connection.query("INSERT INTO USERS(reg_ID, userEMAIL, userID, userPWD, userNAME, userADDR, userTELL, userSSN, userDATE)"
    +" values (?,?,?,?,?,?,?,?,?)"
    ,[user.id, user.email, user.id, user.pass, user.uName, user.addr, user.tell, user.ssn, user.comeIn],
    function(err,rows,fields){
        if(err){
            console.log("회원가입 실패");
             console.log(err);
             connection.rollback();
        }else{
            console.log("회원가입 성공");
             console.log(rows);
             connection.commit();
        }
        
    });
});

//아이디 중복체크 쿼리
app.post('/idCheck', (req,res)=>{
    const user = req.body;
    
    connection.query("SELECT userID FROM USERS WHERE userID = (?)", [user.id],
    function(err,rows,fields){
        if(err){
            console.log("아이디 중복체크 실패");
             console.log(err);
             connection.rollback();
        }else{
            console.log("아이디 중복체크 성공");
             console.log(rows);
             res.send(rows);
             connection.commit();

        }
        
    });
});











app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})