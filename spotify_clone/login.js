function login() {
    const correctemail = 'akshayprocode@gmail.com'
    const correctpassword = '12345'

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    if (email == correctemail && password == correctpassword) {
        alert("login sucessfull")
        window.location.href="index.html"
    } else {
        alert("invalid credential")
    }
}
document.querySelector("button").addEventListener("click",login)
window.addEventListener("load", function() {
    setTimeout(function(){
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    }, 2500); 
});

