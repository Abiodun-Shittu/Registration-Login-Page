const createTodoForm = document.querySelector(".form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("date");
const navPages = document.querySelector(".sidebar");

const url = "http://localhost:8000/api/v0/todos";
let token = localStorage.getItem("token");

window.onload = setTimeout(() => {
	if (!token) {
		window.location.href = "../login/login.html"
	}
	titleInput.focus()
}, 1500);


createTodoForm.addEventListener("submit", (e) => {
	e.preventDefault();

	// Create a new Todo
	setTimeout(() => {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				title: titleInput.value,
				description: descriptionInput.value,
				dueDate: dateInput.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.message === "Unauthorized") {
					window.location.href = "../login/login.html";
				} else if (data.message === "Todo Successfully Created") {
					console.log("todo successfully created");
					localStorage.setItem("todoId", data.todoId);
				}
			})
			.catch((err) => console.log(err));

			titleInput.value = "";
			descriptionInput.value = "";
			dateInput.value = "";

	}, 1500);
});

navPages.addEventListener("click", (e) => {
	e.preventDefault();

	const todosPage = e.target.id === "todos-page";
	const createTodoPage = e.target.id === "new-todo-page";
	const profilePage = e.target.id == "profile-page";

	setTimeout(() => {
		if (todosPage) {
			window.location.href = "../todos/todos.html";
		}

		if (createTodoPage) {
			window.location.href = "../createTodo/todo.html";
		}

		if (profilePage) {
			window.location.href = "../userProfile/profile.html";
		}
	}, 1500);
});