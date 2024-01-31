

const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.onclick = (() => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});

loginBtn.onclick = (() => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});

signupLink.onclick = (() => {
  signupBtn.click();
  return false;
});

function togglePasswordVisibility(inputField, eyeIcon) {
  const inputType = inputField.getAttribute('type');
  if (inputType === 'password') {
    inputField.setAttribute('type', 'text');
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
  } else {
    inputField.setAttribute('type', 'password');
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
  }
}

function signup() {
  const signupUsername = document.getElementById('signupUsername').value;
  const signupPassword = document.getElementById('signupPassword').value;
  const signupconfPassword = document.getElementById('Confirmpassword').value;

  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  const strength = {
    1: "very Weak",
    2: "Weak",
    3: "Medium",
    4: "Strong",
  };

  if (signupUsername === "" || signupPassword === "") {
    alert('Username and password should not be empty');
    return;
  }

  if (signupPassword.length < 8 || signupPassword.length > 15) {
    alert('Password length should not be greater than 15 and less than 8');
    return;
  }

  // Check if password does not match
  if (signupPassword != signupconfPassword) {
    alert('Password does not match!');
    return;
  }

  if (regex.test(signupPassword)) {
    alert('Password is strong');
  } else {
    let count = 0;
    let regex1 = /[a-z]/;
    if (regex1.test(signupPassword)) count++;
    let regex2 = /[A-Z]/;
    if (regex2.test(signupPassword)) count++;
    let regex3 = /\d/;
    if (regex3.test(signupPassword)) count++;
    let regex4 = /[!@#$%^&*.?]/;
    if (regex4.test(signupPassword)) count++;

    alert("Password is " + strength[count]);
    
  }

  // Hash the password (you may want to use a more secure hashing algorithm in production)
  const hashedPassword = btoa(signupPassword);

  // Check if username already exists
  if (localStorage.getItem(signupUsername)) {
    alert('Username already exists. Please choose a different one.');
    return
  }

  // Save user data to Local Storage
  localStorage.setItem(signupUsername, JSON.stringify({ username: signupUsername, password: hashedPassword }));
  alert('Signup successful!');
  loginBtn.click();
}

function login() {
  const loginUsername = document.getElementById('loginUsername').value;
  const loginPassword = document.getElementById('loginPassword').value;

  // Retrieve user data from Local Storage
  const userData = localStorage.getItem(loginUsername);

  if (userData) {
    const { username, password } = JSON.parse(userData);

    // Compare the hashed password
    if (btoa(loginPassword) === password) {
      alert('Login successful!');
      window.open("index.html")
    } else {
      alert('Invalid username or password.');
    }
  } else {
    alert('Invalid username or password.');
  }
}



// Show/hide password functionality
const showPasswordToggle = document.getElementById('showPasswordToggle');
const showPasswordToggle1 = document.getElementById('showPasswordToggle1');
const signupPasswordField = document.getElementById('signupPassword');
const loginPasswordField = document.getElementById('loginPassword');
const signupconfPassword = document.getElementById('Confirmpassword');

showPasswordToggle.addEventListener('click', () => {
 
  togglePasswordVisibility(loginPasswordField, showPasswordToggle);
  
});

showPasswordToggle1.addEventListener('click', () => {
  togglePasswordVisibility(signupPasswordField, showPasswordToggle);
  
  togglePasswordVisibility(signupconfPassword, showPasswordToggle);
});


