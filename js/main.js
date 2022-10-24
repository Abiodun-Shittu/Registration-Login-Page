const showHidePass = document.querySelectorAll(".showHidePass");
const password = document.querySelectorAll("#password");

showHidePass.forEach((icon) => {
	icon.addEventListener("click", () => {
		password.forEach((value) => {
			if (value.type === "password") {
				value.type = "text";

				showHidePass.forEach((icon) => {
					icon.classList.replace("uil-eye-slash", "uil-eye");
				});
			} else {
				value.type = "password";
				showHidePass.forEach((icon) => {
					icon.classList.replace("uil-eye", "uil-eye-slash");
				});
			}
		});
	});
});
