
async function edituser(id) {
    localStorage.setItem("editUserId", id);
    window.location.href = `edituser.html`;
}

async function deleteuser(id, name) {
    if(!confirm(`Are you sure you want to delete this user (${name})? This action cannot be undone.`)) {
        return;
    }

    const result = await deleteUser(id);
    if("error" in result) {
        alert(`Failed to delete user: ${result.error}`);
        return;
    }
    window.location.reload();
}

(async () => {
    const usersData = await getListOfUsers();
    if("error" in usersData) {
        alert(`Failed to load users data: ${usersData.error}`);
        return;
    }

    const table = new simpleDatatables.DataTable("#userstable", {
        data: {
            headings: ["ID", "Name", "Username", "Email", "Enabled", "Privilage Level", "Created At", "Actions"],
            data: usersData.map(user => [
                user.id,
                user.fullname,
                user.username,
                user.email,
                user.enabled ? "Yes" : "No",
                user.privilegeLevel,
                user.createdAt,
                `
                <button onclick="edituser(${user.id})" class="btn btn-sm btn-sm-circle btn-success m-1"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deleteuser(${user.id}, '${user.fullname}')" class="btn btn-sm btn-sm-circle btn-danger m-1"><i class="fa-solid fa-trash-can"></i></button>
                `
            ])
        }
    });

    const searchWrapper = document.querySelector(".datatable-search");

    const btn = document.createElement("button");
    btn.innerHTML = `Add User <i class="fa-solid fa-user-plus"></i>`;
    btn.style.marginTop = "10px";
    btn.style.padding = "6px 10px";
    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => {
        window.location.href = "adduser.html";
    });

    searchWrapper.appendChild(btn);
})();