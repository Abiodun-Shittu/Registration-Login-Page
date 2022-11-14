const updateProfile = document.querySelector(".account");
const hideProfile = document.querySelector(".visible");
const showProfile = document.querySelector(".hidden");

updateProfile.addEventListener("click", () => {
	hideProfile.classList.add("hidden");
	showProfile.classList.remove("hidden");
});
