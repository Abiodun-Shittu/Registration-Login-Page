const username = document.querySelector(".username");
const todoList = document.querySelector(".todos");
const todoNum = document.querySelector(".todo-num");
let output = "";

const url = "http://localhost:8000/api/v0/todos/";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const renderTodos = (todos) => {
	todos.forEach((todo) => {
		output += `
			<div class="todo">
				<div class="todo-text">
					<h3>${todo.title}</h3>
					<p>${todo.description}</p>
					<p>${todo.due_date.slice(0, 10)} ${todo.due_date.slice(11, 16)}</p>
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
		Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NmFlZmEzLTNjNmItNDkyYy1hYzE1LWQyYmQzNGMxOGUxOSIsImVtYWlsIjoiamVycnl3aXprbGF5MUBnbWFpbC5jb20iLCJpYXQiOjE2Njk4MTkzNzQsImV4cCI6MTY2OTkwNTc3NH0.oBj9J15GsIhKomLnkVp-B0c9iFWRJBpgvCmlcwdQ5QA`,
	},
})
	.then((res) => res.json())
	.then((data) => {
		console.log(data[0].todo_id);
		username.innerHTML = "Abiodun";
		todoNum.innerHTML = data.length + " todos";
		renderTodos(data);
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
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NmFlZmEzLTNjNmItNDkyYy1hYzE1LWQyYmQzNGMxOGUxOSIsImVtYWlsIjoiamVycnl3aXprbGF5MUBnbWFpbC5jb20iLCJpYXQiOjE2Njk4MTkzNzQsImV4cCI6MTY2OTkwNTc3NH0.oBj9J15GsIhKomLnkVp-B0c9iFWRJBpgvCmlcwdQ5QA`,
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
			.catch((error) => {
				console.log(error);
			});
	}
});
