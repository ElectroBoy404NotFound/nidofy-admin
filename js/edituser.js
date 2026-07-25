const id = localStorage.getItem("editUserId");
if(!id) {
    alert("No user ID provided for editing.");
    window.location.href = "userslist.html";
}

async function onAddUserSubmit(event) {
	event.preventDefault();
    document.getElementById("adduserform").querySelectorAll("input, textarea, button").forEach(el => el.disabled = true);

    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const enabled = document.getElementById("enabled").checked;
    const privilegeLevel = document.getElementById("privilagelevel").value;

    const response = await editUser(id, fullname, username, email, enabled, privilegeLevel);
    if("error" in response) {
        alert(`Failed to edit user: ${response.error}`);
        document.getElementById("adduserform").querySelectorAll("input, textarea, button").forEach(el => el.disabled = false);
        return;
    }

    window.location.href = "userslist.html";
}

(async () => {
    const userData = await getUser(id);
    if("error" in userData) {
        alert(`Failed to load user data: ${userData.error}`);
        window.location.href = "userslist.html";
        return;
    }

    document.getElementById("userid").value = userData.id;
    document.getElementById("fullname").value = userData.fullname;
    document.getElementById("username").value = userData.username;
    document.getElementById("email").value = userData.email;
    document.getElementById("enabled").checked = userData.enabled;
    document.getElementById("privilagelevel").value = userData.privilegeLevel;
})();