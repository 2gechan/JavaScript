const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

const createTodo = function () {
  // createElement : 태그를 생성해낸다.
  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    // 첫 클릭시 클래스 complete를 생성 다음 클릭 시 삭제
    newLi.classList.toggle("complete");
  });

  // dblclick -> 더블클릭
  newLi.addEventListener("dblclick", () => {
    newLi.remove();
  });
  // 생성한 span태그에 value 저장
  newSpan.textContent = todoInput.value;
  newLi.appendChild(newBtn);
  // 생성한 li태그에 위 코드에서 생성한 span 태그 넣기
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
  saveItemsFn();
};

const keyCodeCheck = () => {
  // keyCode : 13은 enter키
  if (window.event.keyCode === 13 && todoInput.value !== "") {
    createTodo();
  }
};

const deleteAll = () => {
  const liList = document.querySelectorAll("li");
  for (let li of liList) {
    li.remove();
  }
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
  console.log(saveItems);
};
