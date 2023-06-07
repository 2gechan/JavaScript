const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");

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

const counterMaker = function () {
  const nowDate = new Date();
  const dateFormat = dateFormMaker();
  const targetDate = new Date(dateFormat).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;
  if (remaining <= 0) {
    // 만약, remaining이 0이라면, 타이머가 종료되었습니다. 출력
    console.log("타이머가 종료되었습니다.");
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    return;
  } else if (isNaN(remaining)) {
    // 만약, 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다. 출력
    console.log("유효한 시간대가 아닙니다.");
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    container.style.display = "none";
    messageContainer.style.display = "flex";
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

  let i = 0;
  // for of 문은 주로 배열에 많이 사용
  for (let tag of documentArr) {
    document.getElementById(tag).textContent = remainingObj[timeKeys[i]];
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

const starter = function () {
  container.style.display = "flex";
  messageContainer.style.display = "none";
  counterMaker();
  setInterval(counterMaker, 1000);
  // for (let i = 0; i < 100; i++) {
  //   setInterval(counterMaker, 1000);
  // }
};
