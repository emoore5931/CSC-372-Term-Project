"use strict";
const newUsernameRef = document.getElementById("newUsername");
const newPasswordRef = document.getElementById("newPassword");
const newEmailRef = document.getElementById("newEmail");
const signupButtonRef = document.getElementById("newAccountSubmit");

const loginUsernameRef = document.getElementById("username");
const loginPasswordRef = document.getElementById("password");
const loginButtonRef = document.getElementById("submit");

class EntryCover {
    static coverState = 0;

    static stateSwitch() {
        try {
            let entryCover = document.getElementById("entryCover");  
            let coverHeader = document.getElementById("coverHeader");
            let coverButton = document.getElementById("coverButton");

            if (this.coverState == 0) {
                entryCover.classList.add("cover-signup");
                coverHeader.textContent = "Existing Member?";
                coverButton.textContent = "Login Here";
                this.coverState = 1;
            } else {
                entryCover.classList.remove("cover-signup");
                coverHeader.textContent = "New to Boxed Eats?";
                coverButton.textContent = "Signup Here";
                this.coverState = 0;
            }
        } catch (e) {
            throw(e);
        }
    }
}

signupButtonRef.addEventListener("click", async (event) => { 
    event.preventDefault();
    try {
        const newUsername = newUsernameRef.value;
        const newPassword = newPasswordRef.value;
        const newEmail = newEmailRef.value;

        const response = await fetch("/be/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: newUsername,
                password: newPassword,
                email: newEmail
            })
        });

        if (response.ok) {
            alert("Account created successfully, please login to continue.");
        } else {
            alert("Account creation failed: " + response.statusText);
        }
    } catch (e) {
        throw(e);
    }
});

loginButtonRef.addEventListener("click", async (event) => {
    event.preventDefault();
    const username = loginUsernameRef.value;
    const password = loginPasswordRef.value;
    try {
        fetch("/be/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            if (data.isSuccessful || data.isSuccessful == "true") {
                alert("Login successful.");
                if (data.isAdmin == "true" || data.isAdmin == true) {
                    window.location.replace("/be/admin");
                } else {
                    window.location.replace("/be");
                }
            } else {
                alert("Login failed: " + data.err);
            }
        });
    } catch (e) {
        throw(e);
    }
 });