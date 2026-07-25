const isLocalhost = location.port == 5500; // FIXME Only works for VS Code's dev server
const API_BASE_URL = isLocalhost ? "https://nido.dino.icu/api/" : "/api";
// const API_BASE_URL = "http://localhost:8081/";

async function sendPOSTRequest(url, body, authtoken) {
    try {
        if(authtoken) {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authtoken}`
                },
                body: JSON.stringify(body)
            });
            let result = await response.json();
            return result;
        }

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        let result = await response.json();
        return result;
    } catch (error) {
        return {
            error: "POST request failed!"
        };
    }
}

async function sendGETRequest(url, authtoken) {
    try {
        if(authtoken) {
            let response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authtoken}`
                }
            });
            let result = await response.json();
            return result;
        }

        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        let result = await response.json();
        return result;
    } catch (e) {
        return {
            error: "GET request failed!"
        };
    }
}

async function sendDELETERequest(url, authtoken) {
    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${authtoken}`
        }
    });

    let text = await response.text();

    if(!text) {
        return null;
    }

    return JSON.parse(text);
}

async function getHomeData() {
    const data = await sendGETRequest(`${API_BASE_URL}public/home/getHome`);
    return data;
}

async function getListOfPoems() {
    const data = await sendGETRequest(`${API_BASE_URL}public/poems/getAllPoems`);
    return data;
}

async function getPoem(id) {
    const data = await sendGETRequest(`${API_BASE_URL}public/poems/getPoemById?id=${id}`);
    return data;
}

async function login(email, password) {
    const data = await sendPOSTRequest(`${API_BASE_URL}userauth/login`, {
        email,
        password
    });
    return data;
}

async function getUserData(token) {
    const data = await sendGETRequest(`${API_BASE_URL}info/users/me`, token);
    return data;
}

async function refreshToken() {
    const data = await sendPOSTRequest(`${API_BASE_URL}userauth/refresh`, {
        "refreshToken": localStorage.getItem("rtoken")
    });

    return data;
}

async function uploadPoem(title, signature, date, stanzas, signatureLength) {
    const data = await sendPOSTRequest(`${API_BASE_URL}admin/poems/put`, {
        "title": title,
        "signature": signature,
        "date": date,
        "poem": stanzas,
        "signatureLength": signatureLength
    }, localStorage.getItem("token"));
    return data;
}

async function editPoem(id, title, signature, date, stanzas, signatureLength) {
    const data = await sendPOSTRequest(`${API_BASE_URL}admin/poems/edit`, {
        "id": Number(id),
        "title": title,
        "signature": signature,
        "date": date,
        "poem": stanzas,
        "signatureLength": signatureLength
    }, localStorage.getItem("token"));
    return data;
}

async function deletePoem(id) {
    const data = await sendDELETERequest(`${API_BASE_URL}admin/poems/delete/${id}`, localStorage.getItem("token"));
    if(data === null) {
        return {};
    }
    return data;
}

async function getListOfUsers() {
    const data = await sendGETRequest(`${API_BASE_URL}admin/users/list`, localStorage.getItem("token"));
    return data;
}

async function signUp(fullname, username, email, password) {
    const data = await sendPOSTRequest(`${API_BASE_URL}userauth/signup`, {
        fullname,
        username,
        email,
        password
    });
    return data;
}

async function getUser(id) {
    const data = await sendGETRequest(`${API_BASE_URL}info/users/getById/${id}`, localStorage.getItem("token"));
    return data;
}

async function editUser(id, fullname, username, email, enabled, privilegeLevel) {
    const data = await sendPOSTRequest(`${API_BASE_URL}admin/users/update`, {
        "userid": id,
        "fullname": fullname,
        "username": username,
        "email": email,
        "enabled": enabled,
        "privilegeLevel": privilegeLevel
    }, localStorage.getItem("token"));
    return data;
}

async function deleteUser(id) {
    const data = await sendDELETERequest(`${API_BASE_URL}admin/users/delete/${id}`, localStorage.getItem("token"));
    if(data === null) {
        return {};
    }
    return data;
}