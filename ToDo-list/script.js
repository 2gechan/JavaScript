const todoInput = document.querySelector("#todo-input");
const keyCodeCheck = () => {
  // keyCode : 13은 enter키
  if (window.event.keyCode === 13 && todoInput.value !== "") {
    const todoList = document.querySelector("#todo-list");
    // createElement : 태그를 생성해낸다.
    const newLi = document.createElement("li");
    const newSpan = document.createElement("span");

    // 생성한 span태그에 value 저장
    newSpan.textContent = todoInput.value;

    // 생성한 li태그에 위 코드에서 생성한 span 태그 넣기
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
    todoInput.value = "";
  }
};
