const updateProfile = document.querySelector(".account");
const username = document.querySelector("#username");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const todos = document.querySelector("#todos");

const url = "http://localhost:8000/api/v0/users/";

const userId = localStorage.getItem("userId");
let token;
window.onload = () => {
	token = localStorage.getItem("token");
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
