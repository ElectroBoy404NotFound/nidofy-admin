
async function logoutClick() {
    await logoutUser();
    localStorage.removeItem("token");
    localStorage.removeItem("rtoken");
    localStorage.removeItem("user");
    window.location.href = "/";
}

window.addEventListener('DOMContentLoaded', async (event) => {
    if(!localStorage.getItem("user") || !localStorage.getItem("token")) {
        window.location.href = "/login.html";
        return;
    }

    const token = localStorage.getItem("token");
    let newData = await getUserData(token);

    if("error" in newData) {
        const newTokens = await refreshToken();
        if("error" in newTokens) {
            localStorage.removeItem("token");
            localStorage.removeItem("rtoken");
            localStorage.removeItem("user");
            window.location.href = "/login.html";
            return;
        }

        localStorage.setItem("token", newTokens.token);
        localStorage.setItem("rtoken", newTokens.refreshToken);
        newData = await getUserData(newTokens.token);
    }

    localStorage.setItem("user", JSON.stringify(newData));
    document.getElementById("usernamefooter").innerText = newData.fullname;

    if(document.getElementById("welcomepoems")) {
        const dataResponse = await getHomeData();

        document.getElementById("username").innerText = newData.username;
        document.getElementById("welcomepoems").innerText = dataResponse.numberOfPoems;
        document.getElementById("welcomeprojects").innerText = dataResponse.numberOfProject;
    }

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
