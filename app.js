const form = document.forms[0];
const todoList = document.getElementById("todo-list");
const music = document.getElementById("myAudio");
window.addEventListener("load", () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => addTodoItem(todo));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (form.text.value.trim() === "") return;

  addTodoItem(form.text.value);
  form.text.value = "";
  saveTodos();
});

function addTodoItem(todoText) {
  const li = document.createElement("li");
  li.className = "todoList";
  const text = document.createTextNode(todoText);
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit";
  editButton.onclick = function () {
    const newText = prompt("Yangi vazifa matni:", text.textContent);
    if (newText !== null && newText.trim() !== "") {
      text.textContent = newText;
    }
    saveTodos();
  };

  const sound = document.createElement("input");
  sound.setAttribute("type", "radio");
  sound.className = "done-sound";
  sound.src = "notification-2-158188_omH9EQ6e.mp3";
  sound.onclick = function () {
    myAudio();
  };

  const reminder = document.createElement("input");
  reminder.setAttribute("type", "date");
  reminder.className = "reminder";
  reminder.onclick = function () {};

  const time = document.createElement("input");
  time.setAttribute("type", "time");
  time.className = "reminder";
  time.onclick = function () {};

  const setTime = document.createElement("button");
  setTime.className = "setTime";
  setTime.textContent = "Set time";

  setTime.addEventListener("click", setAlarm);

  let alarmTime = null;
  let alarmTimeout = null;

  const success_msg = document.getElementById('success-msg');
  
  function setAlarm() {
    const timeInput = time.value;
    if (!timeInput) {
      success_msg.style.display = 'block';
      success_msg.style.backgroundColor = "rgba(255, 0, 0, 0.87)";
      success_msg.style.color = '#fff';
      success_msg.style.border = '2px solid red' 
    }
    else{
      success_msg.style.display = 'block';
      success_msg.style.backgroundColor = 'rgba(0, 255, 0, 0.87)';
      success_msg.style.color = '#fff';
      success_msg.style.border = '1px solid green';
    }
    setTimeout(() => {
      success_msg.style.display = 'none'
    }, 5000);
    alarmTime = timeInput;
    console.log(`Alarm set for ${alarmTime}`);
    if (alarmTimeout) {
      clearTimeout(alarmTimeout);
    }
    checkAlarm();
    saveTodos()
  }
  function checkAlarm() {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    if (currentTime === alarmTime) {
      playAlarm();
    } else {
      alarmTimeout = setTimeout(checkAlarm, 3000);
    }
  }

  function playAlarm() {
    const alarmSound = document.getElementById("timeSound");
    alarmSound.play();
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  deleteButton.onclick = function () {
    todoList.removeChild(li);
    saveTodos();
  };

  li.appendChild(sound);
  li.appendChild(text);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  li.appendChild(reminder);
  li.appendChild(time);
  li.appendChild(setTime);
  todoList.appendChild(li);
}

function saveTodos() {
  const todos = [];
  todoList.querySelectorAll("li").forEach((li) => {
    todos.push(li.childNodes[1].textContent);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

const audio = document.getElementById("myAudio");

function myAudio() {
  music.play();
}
