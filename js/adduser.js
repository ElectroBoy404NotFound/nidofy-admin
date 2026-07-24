async function onAddUserSubmit(event) {
	event.preventDefault();
    document.getElementById("adduserform").querySelectorAll("input, textarea, button").forEach(el => el.disabled = true);

    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await signUp(fullname, username, email, password);
    if("error" in response) {
        alert(`Failed to add user: ${response.error}`);
        document.getElementById("adduserform").querySelectorAll("input, textarea, button").forEach(el => el.disabled = false);
        return;
    }

    window.location.href = "userslist.html";
}