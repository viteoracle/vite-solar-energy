document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Store the credentials in local storage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Sign up successful! You can now sign in.");

    // Redirect to sign-in page
    window.location.href = "signin.html";
});