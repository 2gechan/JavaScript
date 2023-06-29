const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));
const savedWeatherData = JSON.parse(localStorage.getItem("saved-weather"));
// console.log(savedTodoList);

const createTodo = function (storageData) {
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }

  // createElement : 태그를 생성해낸다.
  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    // 첫 클릭시 클래스 complete를 생성 다음 클릭 시 삭제
    newLi.classList.toggle("complete");
    saveItemsFn();
  });

  // dblclick -> 더블클릭
  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn();
  });

  if (storageData?.complete) {
    newLi.classList.add("complete");
  }

  // 생성한 span태그에 value 저장
  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  // 생성한 li태그에 위 코드에서 생성한 span 태그 넣기
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
  saveItemsFn();
};

const keyCodeCheck = () => {
  // keyCode : 13은 enter키
  if (window.event.keyCode === 13 && todoInput.value.trim() !== "") {
    createTodo();
  }
};

const deleteAll = () => {
  const liList = document.querySelectorAll("li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemsFn();
};

const saveItemsFn = () => {
  const saveItems = [];
  // console.log(todoList.children[0].querySelector("span").textContent);
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItems.push(todoObj);
  }

  saveItems.length === 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-items", JSON.stringify(saveItems));

  // if (saveItems.length === 0) {
  //   localStorage.removeItem("saved-items");
  // } else {
  //   localStorage.setItem("saved-items", JSON.stringify(saveItems));
  // }
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

const weatherDataActive = ({ location, weather }) => {
  const weatherMainList = ["Clear", "Clouds", "Rain", "Thunderstorm"];
  weather = weatherMainList.includes(weather) ? weather : "Clear";
  const locationNameTag = document.querySelector("#location-name-tag");
  locationNameTag.textContent = location;

  document.body.style.backgroundImage = `url("./images/${weather}.jpg")`;

  if (
    !savedWeatherData ||
    savedWeatherData.location !== location ||
    savedWeatherData.weather !== weather
  ) {
    console.log("조건식 성립");
    localStorage.setItem(
      "saved-weather",
      JSON.stringify({ location, weather })
    );
  }
};

const weatherSearch = ({ latitude, longitude }) => {
  const openWeatherRes = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5c9224a22218607cf215c8c30296302e`
  )
    .then((res) => {
      // then은 fetch()를 통해 응답값을 받을때까지 기다려준다
      // JSON.parse 는 데이터가 body만 존재할때만 사용가능
      return res.json();
    })
    .then((json) => {
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherDataActive(weatherData);
    })
    .catch((err) => {
      // then()을 실행하는 동안 에러가 발생하면 catch로 넘어오게 된다.
      // 정상 실행되면 catch로 넘어오지 않는다.
      console.log(err);
    });

  // console.log(openWeatherRes);
};

const accessGeo = ({ coords }) => {
  const { latitude, longitude } = coords;

  const positionObj = {
    // shorthand property
    // key와 value가 같으면 ':'생략가능
    latitude,
    longitude,
  };

  weatherSearch(positionObj);
};

const askForLocation = function () {
  // 첫번 째 매개변수는 getCurrentPosition 함수를 실행하여 현재 위치정보 리턴
  // 두번 째 매개변수는 위치에 접근할 수 없을 때 실행
  navigator.geolocation.getCurrentPosition(accessGeo, (err) => {
    console.log(err);
  });
};

askForLocation();
if (savedWeatherData) {
  weatherDataActive(savedWeatherData);
}

// const promiseTest = () => {
//   return new Promise((resolver, reject) => {
//     setTimeout(() => {
//       resolver(100);
//     }, 2000);
//   });
// };

// promiseTest().then((res) => {
//   console.log(res);
// });
