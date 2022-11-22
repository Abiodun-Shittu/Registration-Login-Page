const userLoginForm = document.querySelector(".form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const pop = document.getElementById("pop");

const url = "http://localhost:8000/api/v0/users/login";

// Focus on Email field when the page loads
window.onload = setTimeout(() => {
	emailInput.focus();
}, 1000);

// Login - Login user
// Method: POST
userLoginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: emailInput.value,
			password: passwordInput.value,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			if (data.message === "success") {
				alert("Login Successful")
				setTimeout (() => {
					window.location.href = "../userProfile/profile.html";
				}, 2000)
			}
		})
		.catch((err) => console.log(err));
});
