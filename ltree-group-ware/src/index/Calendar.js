/*eslint-disable*/
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modali, { useModali } from 'modali';

const Calendar = ({ today, history }) => {
  const scheduleStyle = {
    height: "20%",
    width: "100%",
    minHeight: "11px",
    backgroundColor: "#112667",
    overFlow: "hidden",
    textOverFlow: "ellipsis",
    whiteSpace: "nowrap",
    color: "#fff",
    padding: "1px",
    margin: "0",
    fontSize: "0.5em",
    cursor: "pointer",
  };

  const writeSchedule = (e) => {
    setScheduleDtail({
      ...scheduleDtail,
      [e.target.className] : e.target.value
    })
  }
  const checkedSchedule = (e) => {
    setScheduleDtail({
      ...scheduleDtail,
      completed : e.target.checked
    })
  }

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 11));

  const [schedules, setSchedules] =useState([{promise:'', title:'', content:'', completed:''}]);
  const [scheduleDtail, setScheduleDtail] = useState({promise:'', title:'', content:'', completed: false});
  
  //console.log('시간:',new Date().toISOString().slice(0, 11)+''+(Number(new Date().toString().slice(19, 21))+5));
  const [scheduleModal, toggleScheduleModal] = useModali({
    animated: true,
    title: '상세 일정',
    message:
      <div>
        <div>
          <p>이름 : <input onChange={writeSchedule} value={scheduleDtail.title} className='title' /> 
          <input type='checkbox' onChange={checkedSchedule} /></p>
        </div>
        <div>
          <p>시작일</p>
          <input type='datetime-local' defaultValue={selectedDate + 'T' + new Date().toString().slice(16, 21)} />
        </div>
        <div>
          <p>종료일</p>
          <input type='datetime-local'  defaultValue={selectedDate+'T'+new Date().toString().slice(16, 19)+''
          +((Number(new Date().toString().slice(19, 21))+1) <10 ? '0'+(Number(new Date().toString().slice(19, 21))+1):Number(new Date().toString().slice(19, 21))+1)} />
        </div>
        <div>
          <p>내용</p>
          <input onChange={writeSchedule} value={scheduleDtail.content} className='content' />
        </div>
      </div>,
    centered: true,
    buttons: [
      <Modali.Button
        label="생성"
        isStyleDefault
        onClick={() => console.log(scheduleDtail)}
      />,
      <Modali.Button
        label="삭제"
        isStyleDestructive
        onClick={() => toggleScheduleModal()}
      />,
      <Modali.Button
        label="취소"
        isStyleCancel
        onClick={() => toggleScheduleModal()}
      />
    ],
  });


  let thisyear = today.getFullYear();
  let thismonth = today.getMonth();

  useEffect(() => { 
    fetch("http://localhost:3001/schedule", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((json) => {
                setSchedules(json);
            });
  },[]);

  const monList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let calendarDays = [];
  let new_month = [];

  const makeCalendar = (year, month) => {
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let endDateOfMonth = new Date(year, month + 1, 0).getDate();
    calendarDays = [];
    new_month = [];

    let cnt = 1;
    for (let i = 0; i < 6; i++) {
      var _days = [];
      for (let j = 0; j < 7; j++) {
        if (cnt > endDateOfMonth) {
          _days.push("");
        } else if (firstDayOfMonth > j && i === 0) {
          _days.push("");
        } else {
          _days.push(cnt);
          cnt++;
        }
      }
      calendarDays.push(_days);
    }
    let noday = 0;
    new_month = calendarDays.map((week) => {
      return (
        <Row key={week}>
          {week.map((day, idx) => {
            let dateKey =
              year +
              "-" +
              (month < 9 ? "0" + (month + 1) : month + 1) +
              "-" +
              (day === "" ? '00' + noday++ : day < 10 ? "0" + day : day);

            // console.log(thisyear + "-" + (month < 9 ? "0" + (month + 1) : (month + 1)) + "-" + (day === "" ? noday++ + '00' : day < 10 ? "0" + day : day));
            return (
              <div key={dateKey} className={year+'-'+(month < 9 ? "0" + (month + 1) : month + 1)+'-'+(day < 10 ? "0" + day : day)}
               onClick={(e) =>{setSelectedDate(e.target.className+''); toggleScheduleModal()}}>
                <span
                  style={{
                    color:
                      idx === 0 ? "#CE879F" : idx === 6 ? "#CE879F" : "#444078",
                  }}
                >
                  {day}
                </span>
                {schedules
                  .filter((schedule) => schedule.promise.substr(0, 10) === dateKey)
                  .sort()
                  .map((schedule) => {
                    return (
                      <div
                        style={scheduleStyle}
                        className={schedule.title + ''}
                        key={schedule.title}
                        onClick={() => {
                          setScheduleDtail({promise:schedule.promise, title:schedule.title, content:schedule.content, completed:schedule.completed})
                          toggleScheduleModal();
                        }}
                      >
                        {schedule.title}

                      </div>
                    );
                  })}
              </div>
            );
          })}
        </Row>
      );
    });
    return new_month;
  };

  window.addEventListener(
    "DOMContentLoaded",
    () => {
      if (calendarDays.length === 0) {
        makeCalendar(thisyear, thismonth);
      }

    },
    { once: true }
  );

  const [month, changeMonth] = useState(thismonth);
  const [year, changeYear] = useState(thisyear);


  const nextMonth = () => {
    if (month !== 11) {
      changeMonth((month) => month + 1);
    } else {
      changeMonth((month) => month - 11);
      changeYear((year) => year + 1);
    }
    makeCalendar(year, month);
    console.log("next!", year, month, new_month);
  };
  const prevMonth = () => {
    if (month !== 0) {
      changeMonth((month) => month - 1);
    } else {
      changeMonth((month) => month + 11);
      changeYear((year) => year - 1);
    }
    makeCalendar(year, month);
  };


  return (

    <Container>
      <Header>
        <button onClick={prevMonth}>◀</button>
        <span>
          {monList[month]} {year}
        </span>
        <button onClick={nextMonth}>▶</button>
      </Header>
      <Days>
        <Day>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </Day>

        {makeCalendar(year, month)}
      </Days>

     
      <Modali.Modal {...scheduleModal} />
    </Container>

  );
};

const Container = styled.div`
  width: 50vw;
  height: 80vh;
  align-items: center;
  /* justify-content:center; */
  flex-direction: column;
  display: flex;
  font-size: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 5px 20px;
  box-sizing: border-box;
  font-weight: 600;
  width: 100%;
  height: 14%;
  font-size: 1em;
  & button {
    margin: 0 25px;
    cursor: pointer;
    outline: none;
    display: inline-flex;
    background: transparent;
    border: none;
    color: #444078;
    font-size: 1.2em;
    padding: 4px;
    &:hover {
      color: #fff;
    }
    &:active {
    }
  }
`;
const Days = styled.div`
  background-color: #fff;
  width: 93%;
  height: 81%;
  padding: 8px 10px;
  box-sizing: border-box;
  color: #787c9c;
  margin: 0;
  border-radius: 5px;
  font-size: 0.8em;
`;
const Day = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  & div {
    min-width: 13%;
    max-height: 5%;
    text-align: center;
    font-weight: 600;
    box-sizing: border-box;
  }
`;

const Row = styled.div`
  width: 100%;
  height: 16%;
  display: flex;
  justify-content: space-between;
  & div {
    width: 13%;
    height: 100%;
    font-weight: 600;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  & span {
    margin: 3px 0 0 3px;
    font-size: 0.8em;
  }
`;

const FloatBtn1 = styled.button`
  box-shadow: 0 1px 2px 0 #777;
  position: fixed;
  z-index: 999;
  right: 6%;
  bottom: 18%;
  width: 18%;
  min-width: 80px;
  max-width: 130px;
  height: 30px;
  margin: auto 0px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.7em;
  color: #4d4887;
  cursor: pointer;
  outline: none;
`;
const FloatBtn2 = styled.button`
  box-shadow: 0 1px 2px 0 #777;
  position: fixed;
  z-index: 999;
  right: 6%;
  bottom: 10%;
  width: 18%;
  min-width: 80px;
  max-width: 130px;
  height: 30px;
  margin: auto 0px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  color: #4d4887;
  font-size: 0.7em;
  cursor: pointer;
  outline: none;
  & img {
    margin-top: 2px;
    max-height: 70%;
    width: auto;
    color: #bebddb;
  }
`;

export default Calendar;