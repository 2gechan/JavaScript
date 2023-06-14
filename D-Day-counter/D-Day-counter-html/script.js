const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem("saved-date");

const intervalIdArr = [];

container.style.display = "none";
messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
// messageContainer.textContent = "D-Day를 입력해 주세요.";
// textContent를 통해 d-day-message라는 id를 가진 태그에 텍스트를 입력해준다.

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  // const dateFormat = inputYear + "-" + inputMonth + "-" + inputDate;
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
  // console.log(inputYear, inputMonth, inputDate);
};

const counterMaker = function (data) {
  if (data !== savedDate) {
    localStorage.setItem("saved-date", data);
  }
  const dateFormat = dateFormMaker();

  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;
  if (remaining <= 0) {
    // 만약, remaining이 0이라면, 타이머가 종료되었습니다. 출력
    // console.log("타이머가 종료되었습니다.");
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    setClearInterval();
    return;
  } else if (isNaN(remaining)) {
    // 만약, 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다. 출력
    // console.log("유효한 시간대가 아닙니다.");
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    container.style.display = "none";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor((remaining / 3600) % 24),
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining % 60),
  };

  // html tag 들의 id
  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);
  // const docKeys = Object.keys(documentObj);

  const format = (time) => {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  // for of 문은 주로 배열에 많이 사용
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }

  // console.log(timeKeys, docKeys);
  // for (let i = 0; i < timeKeys.length; i++) {
  //   documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
  // }

  // const documentObj = {
  //   days: document.getElementById("days"),
  //   hours: document.querySelector("#hours"),
  //   min: document.querySelector("#min"),
  //   sec: document.querySelector("#sec"),
  // };

  // 객체의 키값 들을 마지막까지 전체 출력
  // let i = 0;
  // for (let key in documentObj) {
  //   documentObj[key].textContent = remainingObj[timeKeys[i]];
  //   i++;
  // }
  /*
  const days = document.getElementById("days");
  // getElementById를 통해 id만 지정해서 찾을 수 있다
  const hours = document.querySelector("#hours");
  const min = document.querySelector("#min");
  const sec = document.querySelector("#sec");
  */

  // documentObj["days"].textContent = remainingObj.remainingDate;
  // documentObj.hours.textContent = remainingObj.remainingHours;
  // documentObj.min.textContent = remainingObj.remainingMin;
  // documentObj.sec.textContent = remainingObj["remainingSec"];
};

// html에서 버튼 클릭을 통해 함수를 실행하여 매개변수가 없더라도 js를 미리 DOC에서 읽어놨기 때문에
// 그밑에서 매개변수를 대신할 데이터가 생성된다는 것을 알고 정상 실행되게 된다.
const starter = function (dateFormat) {
  if (!dateFormat) {
    dateFormat = dateFormMaker();
  }

  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  counterMaker(dateFormat);
  const intervalId = setInterval(() => {
    counterMaker(dateFormat);
  }, 1000);
  // for (let i = 0; i < 100; i++) {
  //   setInterval(counterMaker, 1000);
  // }
  intervalIdArr.push(intervalId);
};

const setClearInterval = () => {
  localStorage.removeItem("saved-date");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
  messageContainer.style.display = "flex";
  setClearInterval();
};

// truthy - 데이터가 있으면 조건문 실행, 반대로는 falsy - null, "", NaN 등이 있다
if (savedDate) {
  starter(savedDate);
} else {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
}
