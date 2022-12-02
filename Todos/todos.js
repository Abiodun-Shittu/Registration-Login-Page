const username = document.querySelector(".username");
const todoList = document.querySelector(".todos");
const todoNum = document.querySelector(".todo-num");
const visible = document.querySelector(".visible");
const hidden = document.querySelector(".hidden");
const updateTodoForm = document.querySelector(".form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const dueDateInput = document.getElementById("date");
const updateButton = document.querySelector(".btn");
let output = "";

const url = "http://localhost:8000/api/v0/todos/";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const renderTodos = (todos) => {
	todos.forEach((todo) => {
		output += `
			<div class="todo">
				<div class="todo-text">
					<h3 class="title">${todo.title}</h3>
					<p class="description">${todo.description}</p>
					<p class="due_date">${todo.due_date.slice(0, 10)} ${todo.due_date.slice(
			11,
			16
		)}</p>
				</div>
				<div class="todo-update" data-id=${todo.todo_id}>
					<img id="edit" src="../assets/images/edit-icon.png" alt="Edit">
					<img id="delete" src="../assets/images/delete-icon.png" alt="Delete">
				</div>
			</div>
		`;
	});
	todoList.innerHTML = output;
};

fetch(url, {
	method: "GET",
	headers: {
		Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NmFlZmEzLTNjNmItNDkyYy1hYzE1LWQyYmQzNGMxOGUxOSIsImVtYWlsIjoiamVycnl3aXprbGF5MUBnbWFpbC5jb20iLCJpYXQiOjE2Njk5MTYyNDMsImV4cCI6MTY3MDAwMjY0M30.ODlvpb7bs9vxZoYqEzcZHKABbDOYTwuo_wquxXQIO9s`,
	},
})
	.then((res) => res.json())
	.then((data) => {
		username.innerHTML = "Abiodun";
		todoNum.innerHTML = data.length + " todos";
		renderTodos(data);
	})
	.catch((err) => {
		console.log(err);
	});

todoList.addEventListener("click", (e) => {
	e.preventDefault();

	const deleteIcon = e.target.id == "delete";
	const editIcon = e.target.id == "edit";
	const todoId = e.target.parentElement.dataset.id;

	if (deleteIcon) {
		fetch(url + todoId, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NmFlZmEzLTNjNmItNDkyYy1hYzE1LWQyYmQzNGMxOGUxOSIsImVtYWlsIjoiamVycnl3aXprbGF5MUBnbWFpbC5jb20iLCJpYXQiOjE2Njk5MTYyNDMsImV4cCI6MTY3MDAwMjY0M30.ODlvpb7bs9vxZoYqEzcZHKABbDOYTwuo_wquxXQIO9s`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message === "Unauthorized") {
					window.location.href = "../login/login.html";
				} else if (data.message === "Todo successfully deleted") {
					console.log("Todo deleted successfully");
					location.reload();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	if (editIcon) {
		setTimeout(() => {
			visible.classList.add("hidden");
			hidden.classList.remove("hidden");

			const parent = e.target.parentElement.parentElement;
			const titleValue = parent.querySelector(".title").textContent;
			const descriptionValue =
				parent.querySelector(".description").textContent;
			const dueDateValue = parent.querySelector(".due_date").textContent;

			titleInput.value = titleValue;
			descriptionInput.value = descriptionValue;
			dueDateInput.value = dueDateValue;
		}, 1500);
	}
	updateButton.addEventListener("click", (e) => {
		e.preventDefault();

		fetch(url + todoId, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NmFlZmEzLTNjNmItNDkyYy1hYzE1LWQyYmQzNGMxOGUxOSIsImVtYWlsIjoiamVycnl3aXprbGF5MUBnbWFpbC5jb20iLCJpYXQiOjE2Njk5MTYyNDMsImV4cCI6MTY3MDAwMjY0M30.ODlvpb7bs9vxZoYqEzcZHKABbDOYTwuo_wquxXQIO9s`,
			},
			body: {
				"title": "backend Task",
				"description": "To Build a CRUD API",
				"dueDate": "22-10-2022",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.message === "Unauthorized") {
					window.location.href = "../login/login.html";
				} else if (data.message === "Todo Successfully Updated") {
					console.log("Todo updated successfully");
				}
			});
	});
});
