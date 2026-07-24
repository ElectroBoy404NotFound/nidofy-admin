async function doLogin() {
    const loginBtn = document.getElementById("loginbtn");
    loginBtn.disabled = true;
    loginBtn.innerText = "Logging in...";

    const username = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;

    if(!username || !password) {
        alert("Please enter both email and password.");
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
        return;
    }

    const result = await login(username, password);

    if("error" in result) {
        alert(`Login failed: ${result.error}`);
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
        return;
    }

    localStorage.setItem("token", result.token);
    localStorage.setItem("rtoken", result.refreshToken);
    localStorage.setItem("user", JSON.stringify(await getUserData(result.token)));

    window.location = "/";
}