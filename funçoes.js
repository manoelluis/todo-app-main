const tema = document.getElementById("tema");
const newItemInput = document.getElementById("addTarefa");
const todoList = document.querySelector(".conteudo ul");
const tarefasRestantes = document.querySelector(".tarefas_restantes span");

tarefasRestantes.innerText = document.querySelectorAll(
  '.tarefa input[type="checkbox"]'
).length;

tema.addEventListener("click", () => {
  document.querySelector("body").classList = [
    tema.checked ? "light_mode" : "dark_mode",
  ];
});

newItemInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && newItemInput.value.length > 0) {
    createNewTodoItem(newItemInput.value);
    newItemInput = "";
  }
});

function createNewTodoItem(texto) {
  const elem = document.createElement("li");
  elem.classList.add("flex_row");

  elem.innerHTML = `
    <label class="tarefa">
    <input type="checkbox" name="fazerTarefa" />
    <span class="checkmark"></span>
    <span class="texto">${texto}</span>
    </label>
    <span class="remove"></span>
    `;

  if (
    document.querySelector('.filtro input[type="radio"]:checked').id ===
    "finalizados"
  ) {
    elem.classList.add("hidden");
  }

  todoList.append(elem);
  updateItemsCount(1);
}

function updateItemsCount(numero) {
  tarefasRestantes.innerText = +tarefasRestantes.innerText + numero;
}

//remover tarefa

function removeTodoItem(elem) {
  elem.remove();
  updateItemsCount(-1);
}

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    removeTodoItem(event.target.parentElement);
  }
});

//limpar itens completos

document.querySelector(".limpar").addEventListener("click", () => {
  document
    .querySelectorAll('.tarefa input[type="checkbox"]:checked')
    .forEach((item) => {
      removeTodoItem(item.closest("li"));
    });
});

//filtrar tarefas

document.querySelectorAll(".filtro input").forEach((radio) => {
  radio.addEventListener("change", (e) => {
    filterTodoItems(e.target.id);
  });
});

function filterTodoItems(id) {
  const allItems = todoList.querySelectorAll("li");

  switch (id) {
    case "todos":
      allItems.forEach((item) => {
        item.classList.remove("hidden");
      });
      break;
    case "ativos":
      allItems.forEach((item) => {
        item.querySelector("input").checked
          ? item.classList.add("hidden")
          : item.classList.remove("hidden");
      });
      break;
    default:
      allItems.forEach((item) => {
        !item.querySelector("input").checked
          ? item.classList.add("hidden")
          : item.classList.remove("hidden");
      });
      break;
  }
}
