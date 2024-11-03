document.getElementById("signinForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        alert("Sign in successful!");
        // Redirect to the random questions page
        window.location.href = "select.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});