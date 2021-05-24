const express = require("express");
const app = express();
const port = 3001; 
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


/*************************************************로그인 관련************************************************************/
/* 로그인 하기 */
app.post("/Login", (req,res)=>{
    const id = req.body.id;
    const pass = req.body.pass;
    connection.query("select COUNT(userid) ming,userNAME,userID from USERS where userID=(?) and userPWD=(?)",[id,pass],
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
            console.log("아이디 찾기 실패");
            console.log("error" +err);
        }else{
            console.log("아이디 찾기 성공");
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
            console.log("비밀번호 찾기 실패");
            console.log("error" +err);
        }else{
            console.log("비밀번호 찾기 성공");
            res.send(rows);
            console.log(rows);
            console.log(pfbox,tfbox);
        }
    })
})

/*DB id 리스트 */
app.post("/IdList", (req,res)=>{
    const No1 = req.body.num;
    connection.query("select userID from users",
    function(err,rows,fields){
        if(err){
            console.log("직원 아이디 불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("직원 아이디 불러오기 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});

/*DB pass 리스트 */
app.post("/PassList", (req,res)=>{
    const No1 = req.body.num;
    connection.query("select userPWD from users",
    function(err,rows,fields){
        if(err){
            console.log("비밀번호 불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("비밀번호 불러오기 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});

/*************************************************회원가입 관련************************************************************/
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


/*************************************************공지사항 관련************************************************************/
/*공지사항 insert문 */
app.post("/AddNotice", (req,res)=>{
    const wtitle = req.body.wt;
    const wcontent = req.body.wc;
    connection.query("insert into Notice values(No1,NOW(), ?, ?, 0)",[wtitle,wcontent],
    function(err,rows,fields){
        if(err){
            console.log("공지사항 생성 실패");
            console.log("error" +err);
        }else{
            console.log("공지사항 생성 성공");
            res.send(rows);
            console.log(rows);
            console.log(wtitle,wcontent);
        }
    })
})

/*공지사항 select문 */
app.post("/Notice", (req,res)=>{
    connection.query("select *, @row_num:= @row_num + 1 as rownu from(select @row_num:= 0 as rowNum,No1,ntitle,click,date_format(sysdate1 ,'%Y-%m-%d') as ndate from Notice order by sysdate1 desc) t",
    function(err,rows,fields){
        if(err){
            console.log("공지사항 불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("공지사항 불러오기 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});

/*공지사항 constents select문 */
app.post("/NoticeContent", (req,res)=>{
    const numbox = req.body.num;
    connection.query("select *, @row_num:= @row_num + 1 as rownu from(select @row_num:= 0 as rowNum,No1,ntitle,ncontent,click,date_format(sysdate1 ,'%Y-%m-%d') as ndate,date_format(update1 ,'%y-%m-%d-%h-%i') as update1 from Notice order by sysdate1 desc) t where No1 = ?",[numbox],
    function(err,rows,fields){
        if(err){
            console.log("공지사항 상세페이지 불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("공지사항 상세페이지 불러오기 성공");
            res.send(rows);
            console.log(rows[0].No1);
        }
    })
});


/* 공지사항 삭제 로직 */
app.post("/DeleteNotice", (req,res)=>{
    const No1 = req.body.no1;

    connection.query("delete from notice where No1= ? ",[No1],
    function(err,rows,fields){
        if(err){
            console.log("공지사항 삭제 실패");
            console.log("error" +err);
        }else{
            console.log("공지사항 삭제 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});


/*공지사항 수정 select 문 */
app.post("/NoticeUpdate", (req,res)=>{
    const num = req.body.num;
    connection.query("select No1,date_format(sysdate1,'%Y-%m-%d') as ndate,ntitle,ncontent from notice where No1 = ? ",[num],
    function(err,rows,fields){
        if(err){
            console.log("공지사항 수정데이터 불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("공지사항 수정데이터 불러오기 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});


/*공지사항 update문 */
app.post("/UpdateNotice", (req,res)=>{
    const ntitle = req.body.bt;
    const ncontent = req.body.bc;
    const No1 = req.body.no1;

    connection.query("update notice set ntitle= ? , ncontent= ? ,update1=NOW() where No1 = ?",[ntitle,ncontent,No1],
    function(err,rows,fields){
        if(err){
            console.log("공지사항 수정 실패");
            console.log("error" +err);
        }else{
            console.log("공지사항 수정 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});


/*공지사항 조회수  */
app.post("/ClickAdd", (req,res)=>{
    const No1 = req.body.num;
    connection.query("update notice set click= click + 1  where No1=?",[No1],
    function(err,rows,fields){
        if(err){
            console.log("공지사항 조회수 변경 실패");
            console.log("error" +err);
        }else{
            console.log("공지사항 조회수 변경 성공");
            res.send(rows);
            console.log(rows);
            console.log("숫자="+No1);
        }
    })
});

/*************************************************게시판 관련************************************************************/
/*업무 게시판 select문 */
app.post("/Board", (req,res)=>{
    connection.query("select *, @row_num:= @row_num + 1 as rownu from(select @row_num:= 0 as rowNum,No1,btitle,date_format(sysdate1 ,'%Y-%m-%d') as bdate, click from Board order by sysdate1 desc) t",
    function(err,rows,fields){
        if(err){
            console.log("게시판 불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("게시판 불러오기 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});

/*업무 게시판 insert문 */
app.post("/AddBoard", (req,res)=>{
    const btitle = req.body.bt;
    const bcontent = req.body.bc;

    connection.query("insert into Board values(No1,NOW(),NOW(), ? , ?, 0)",[btitle,bcontent],
    function(err,rows,fields){
        if(err){
            console.log("게시판 생성 실패");
            console.log("error" +err);
        }else{
            console.log("게시판 생성 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});


/*업무 게시판 constents select문 */
app.post("/Boardcontent", (req,res)=>{
    const numbox = req.body.num;
    connection.query("select No1,date_format(sysdate1,'%Y-%m-%d') as bdate,date_format(update1 ,'%y-%m-%d-%h-%i') as update1,btitle,bcontent,click from Board where No1 = ? ",[numbox],
    function(err,rows,fields){
        if(err){
            console.log("게시판 상세페이지 실패");
            console.log("error" +err);
        }else{
            console.log("게시판 상세페이지 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});

/*업무 게시판 수정 select 문 */
app.post("/BoardUpdate", (req,res)=>{
    const num = req.body.num;
    connection.query("select No1,date_format(sysdate1,'%Y-%m-%d') as bdate,btitle,bcontent from Board where No1 = ? ",[num],
    function(err,rows,fields){
        if(err){
            console.log("게시판 수정데이터 불러오기 실패");
            console.log("error" +err);
        }else{
            console.log("게시판 수정데이터 불러오기 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});


/*업무 게시판 update문 */
app.post("/UpdateBoard", (req,res)=>{
    const btitle = req.body.bt;
    const bcontent = req.body.bc;
    const No1 = req.body.no1;

    connection.query("update Board set btitle= ? , bcontent= ? , update1=NOW() where No1 = ?",[btitle,bcontent,No1],
    function(err,rows,fields){
        if(err){
            console.log("게시판 수정 실패");
            console.log("error" +err);
        }else{
            console.log("게시판 수정 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});

/* 업무게시판 삭제 로직 */
app.post("/DeleteBoard", (req,res)=>{
    const No1 = req.body.no1;

    connection.query("delete from board where No1= ? ",[No1],
    function(err,rows,fields){
        if(err){
            console.log("게시판 삭제 실패");
            console.log("error" +err);
        }else{
            console.log("게시판 삭제 성공");
            res.send(rows);
            console.log(rows);
        }
    })
});

/*업무 게시판 조회수  */
app.post("/ClickAdd1", (req,res)=>{
    const No1 = req.body.num;
    connection.query("update board set click= click + 1  where No1=?",[No1],
    function(err,rows,fields){
        if(err){
            console.log("게시판 조회수 변경 실패");
            console.log("error" +err);
        }else{
            console.log("게시판 조회수 변경 성공");
            res.send(rows);
            console.log(rows);
            console.log("숫자="+No1);
        }
    })
});


/*************************************************스케쥴 관련************************************************************/
//스케쥴 조회 쿼리
app.post("/schedule", (req, res) => {

    connection.query("SELECT * FROM schedule",
        function (err, rows, fields) {
            if (err) {
                console.log("스케쥴 조회 실패");
                console.log(err);
                connection.rollback();
            } else {
                console.log("스케쥴 조회 성공");
                console.log(rows);
                res.send(rows);
                connection.commit();
            }
        });
});

//일정 정보 변경쿼리
app.put('/update-schedule', (req, res) => {
    const sch = req.body;
    connection.query("UPDATE schedule SET s_time=(?), e_time=(?), title=(?), content=(?), completed=(?) WHERE id = (?)"
    , [sch.s_time.slice(0, 16), sch.e_time.slice(0, 16), sch.title, sch.content, sch.completed, sch.id],
        function (err, rows, fields) {
            if (err) {
                console.log("일정 변경 실패");
                console.log(err);
                connection.rollback();
            } else {
                console.log("일정 변경 성공");
                console.log(rows);
                res.send(rows);
                connection.commit();
            }

        });
});

//일정 생성
app.post('/insert-schedule', (req, res) => {
    const sch = req.body;
    connection.query("INSERT INTO schedule VALUES(id, ?, ?, ?, ?, ?)"
    , [sch.s_time, sch.e_time, sch.title, sch.content, sch.completed],
        function (err, rows, fields) {
            if (err) {
                console.log("일정 생성 실패");
                console.log(err);
                connection.rollback();
            } else {
                console.log("일정 생성 성공");
                console.log(rows);
                res.send(rows);
                connection.commit();
            }

        });
});


/*************************************************직원조회 관련************************************************************/
//직원조회 쿼리
app.post("/u-mgnt", (req, res) => {

    connection.query("SELECT * FROM USERS",
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

//직원 정보 변경 쿼리
app.put('/update-user', (req, res) => {
    const user = req.body;
    connection.query("UPDATE USERS SET userNAME=(?), userTELL=(?), userEMAIL=(?), userSSN=(?), userADDR=(?), userRANK=(?), update_DATE=NOW() WHERE userID = (?)"
    , [user.userNAME, user.userTELL, user.userEMAIL, user.userSSN, user.userADDR, user.userRANK, user.userID],
        function (err, rows, fields) {
            if (err) {
                console.log("직원정보 업데이트 실패");
                console.log(err);
                connection.rollback();
            } else {
                console.log("직원정보 업데이트 성공");
                console.log(rows);
                res.send(rows);
                connection.commit();
            }

        });
});


app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
})