let todos = [];

/*--- HANDLE ADD FORM ---*/
const addInputNode = document.getElementById("addInput");
const addFormNode = document.getElementById("addForm");
addFormNode.addEventListener("submit", (event) => {
  event.preventDefault();
  if (addInputNode.value) {
    addTodo(addInputNode.value);
    addInputNode.value = "";
  }
});

function addTodo(addedValue) {
  const newTodo = {
    id: Date.now(),
    label: addedValue,
    isDone: false,
    isEditting: false,
  };
  todos.unshift(newTodo);
  renderTodos();
}

/*--- HANDLE RENDER TODO-ITEMS ---*/
function renderTodos() {
  const todoListNode = document.getElementById("todoList");
  todoListNode.innerHTML = "";

  todos.forEach((todo) => {
    const { id, label, isDone, isEditting } = todo || {};

    const todoItemNode = document.createElement("li");
    todoItemNode.className = `todo-item ${isDone ? "done" : ""}`;
    todoItemNode.id = id;

    const labelNode = document.createElement("span");
    labelNode.className = "todo-label";
    labelNode.innerText = label;

    const actionNode = document.createElement("div");
    actionNode.className = "todo-action";

    const deleteBtnNode = document.createElement("button");
    deleteBtnNode.className = "btn btn-delete";
    deleteBtnNode.innerText = "Delete";
    deleteBtnNode.addEventListener("click", (event) => {
      event.preventDefault();
      deleteTodo(id);
    });

    const editBtnNode = document.createElement("button");
    editBtnNode.className = "btn btn-edit";
    editBtnNode.innerText = "Edit";
    editBtnNode.addEventListener("click", (event) => {
      event.preventDefault();
      toggleEditView(id);
    });

    const doneBtnNode = document.createElement("button");
    doneBtnNode.className = "btn btn-done";
    doneBtnNode.innerText = isDone ? "Undone" : "Done";
    doneBtnNode.addEventListener("click", (event) => {
      event.preventDefault();
      updateTodoStatus(id);
    });

    const editInputNode = document.createElement("input");
    editInputNode.className = "input editInput";
    editInputNode.value = label;

    const saveBtnNode = document.createElement("button");
    saveBtnNode.className = "btn";
    saveBtnNode.innerText = "Save";

    const editFormNode = document.createElement("form");
    editFormNode.className = "form editForm";
    editFormNode.addEventListener("submit", (event) => {
      event.preventDefault();
      if (editInputNode.value) {
        updateTodoLabel(id, editInputNode.value);
        toggleEditView(id);
        editInputNode.value = "";
      }
    });

    if (isEditting) {
      editFormNode.appendChild(editInputNode);
      editFormNode.appendChild(saveBtnNode);
      todoItemNode.appendChild(editFormNode);
    } else {
      actionNode.appendChild(deleteBtnNode);
      !isDone && actionNode.appendChild(editBtnNode);
      actionNode.appendChild(doneBtnNode);
      todoItemNode.appendChild(labelNode);
      todoItemNode.appendChild(actionNode);
    }

    todoListNode.appendChild(todoItemNode);
  });
}

/*--- FUNCTIONS ---*/
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function updateTodoStatus(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
  );
  renderTodos();
}

function toggleEditView(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, isEditting: !todo.isEditting } : todo
  );
  renderTodos();
}

function updateTodoLabel(id, editedLabel) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, label: editedLabel } : todo
  );
  renderTodos();
}
