const updateProfile = document.querySelector(".account");
const deleteProfile = document.querySelector(".delete");
const visible = document.querySelector(".visible");
const hidden = document.querySelector(".hidden");
const hiddenForm = document.querySelector(".hidden-form");
const acceptDelete = document.querySelector(".yes");
const declineDelete = document.querySelector(".no");
const username = document.querySelector("#username");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const todos = document.querySelector("#todos");
const navPages = document.querySelector(".sidebar");

const url = "http://localhost:8000/api/v0/users/";
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

window.onload = () => {
	if (!token) {
		window.location.href = "../login/login.html";
	}

	// GET user information
	setTimeout(() => {
		fetch(url + userId, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				username.innerHTML = data.data.name.split(" ")[0];
				name.innerHTML = data.data.name;
				email.innerHTML = data.data.email;
			})
			.catch((error) => console.log(error));
	}, 1000);

	// Get All Todos
	setTimeout(() => {
		const url = "http://localhost:8000/api/v0/todos/";
		fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.message === "Unauthorized") {
					window.location.href = "../login/login.html";
				}
				todos.innerHTML =
					"You currently have " + data.length + " todos";
			})
			.catch((err) => console.log(err));
	}, 1000);
};

updateProfile.addEventListener("click", () => {
	setTimeout(() => {
		window.location.href = "../updateProfile/updateProfile.html";
	}, 1500);
});

deleteProfile.addEventListener("click", () => {
	setTimeout(() => {
		visible.classList.add("hidden");
		hidden.classList.remove("hidden");
	}, 1000);
});

acceptDelete.addEventListener("click", (e) => {
	e.preventDefault();

	// DELETE User Profile
	setTimeout(() => {
		fetch(url + userId, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.message === "Unauthorized") {
					window.location.href = "../login/login.html";
				} else if (data.message === "User successfully deleted") {
					console.log("User deleted successfully");
					window.location.href = "../index.html";
				}
			})
			.catch((err) => console.log(err));
	}, 2000);
});

declineDelete.addEventListener("click", () => {
	setTimeout(() => {
		hidden.classList.add("hidden");
		visible.classList.remove("hidden");
	}, 1000);
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
