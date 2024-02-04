
const score = 0;
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




function IsEmail(email) {
  const regex =
/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
      return false;
  }
  else {
      return true;
  }
}


function togglePasswordVisibility(inputField, eyeIcon) {
  const inputType = inputField.getAttribute('type');
  if (inputType === 'password') {
    inputField.setAttribute('type', 'text');
   
  } else {
    inputField.setAttribute('type', 'password');
   
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


  if (IsEmail(signupUsername) === false) {
    
    
    return;
}

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

  

  

  // Hash the password (you may want to use a more secure hashing algorithm in production)
  const hashedPassword = btoa(signupPassword);

  // Retrieve existing user data from local storage
  const userData = JSON.parse(localStorage.getItem('userData')) || [];
  
  // Check if username already exists
  if (userData.some(user => user.username === signupUsername)) {
    alert('Username already exists. Please choose a different one.');
  
  }

  else if (regex.test(signupPassword)) {
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

  // Save user data to local storage
  userData.push({ username: signupUsername, password: hashedPassword, score: 0 });
  localStorage.setItem('userData', JSON.stringify(userData));

  
  alert('Signup successful!');
  loginBtn.click();
}

function login() {
  const loginUsername = document.getElementById('loginUsername').value;
  const loginPassword = document.getElementById('loginPassword').value;

  // Retrieve user data from Local Storage
  const userData = JSON.parse(localStorage.getItem('userData')) || [];

  const loggedInUser = userData.find(user => user.username === loginUsername);

  if (loggedInUser) {
    // Compare the hashed password
    if (btoa(loginPassword) === loggedInUser.password) {
      alert('Login successful!');

      // Set the logged-in user in local storage
      localStorage.setItem('loggedInUser', loginUsername);

      // Redirect to the quiz page or any other desired page
      setTimeout(() => {
        window.location.href = 'quiz.html';
      }, 10);

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



function logout() {
  localStorage.setItem('loggedInUser', "");
  
  location.href = "index.html"
}





