const userRegForm = document.querySelector(".form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const url = "http://localhost:8000/api/v0/users";

// Focus on Name field when the page loads
window.onload = setTimeout(() => {
	nameInput.focus();
}, 1000);

// Register - create a new user
// Method: POST
userRegForm.addEventListener("submit", (e) => {
	e.preventDefault();
	fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: nameInput.value,
			email: emailInput.value,
			password: passwordInput.value,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (data.message === "User Successfully Created") {
				console.log("User Successfully Created");
				localStorage.setItem("userId", data.id);
				localStorage.setItem("token", data.token);
				setTimeout(() => {
					window.location.href = "../userProfile/profile.html";
				}, 2000);
			} else if (data.message === "Email Already Exists") {
				console.log("Email Already Exists");
				setTimeout(() => {
					window.location.href = "../login/login.html";
				}, 2000);
			}
		})
		.catch((error) => console.log(error));
});
