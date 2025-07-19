// document.addEventListener('DOMContentLoaded', function () {
//     const tabs = document.querySelectorAll('.auth-tab');
//     const forms = document.querySelectorAll('.auth-form');

//     // Tab switching
//     tabs.forEach(tab => {
//         tab.addEventListener('click', function () {
//             const tabName = this.getAttribute('data-tab');
//             tabs.forEach(t => t.classList.remove('active'));
//             this.classList.add('active');
//             forms.forEach(form => form.classList.remove('active'));
//             document.getElementById(`${tabName}-form`).classList.add('active');
//         });
//     });

//     // Switch tab links
//     document.querySelectorAll('.switch-tab').forEach(link => {
//         link.addEventListener('click', function (e) {
//             e.preventDefault();
//             const tabName = this.getAttribute('data-tab');
//             document.querySelector(`.auth-tab[data-tab="${tabName}"]`).click();
//         });
//     });

//     // Register
//     document.getElementById('register-form').addEventListener('submit', async function (e) {
//         e.preventDefault();
//         const name = document.getElementById('register-name').value;
//         const email = document.getElementById('register-email').value;
//         const password = document.getElementById('register-password').value;
//         const confirm = document.getElementById('register-confirm').value;

//         if (!name || !email || !password || !confirm) {
//             alert('Please fill in all fields');
//             return;
//         }

//         if (password !== confirm) {
//             alert('Passwords do not match!');
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:5500/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name, email, password })
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 alert(`Registration failed: ${data.message}`);
//             } else {
//                 alert(data.message);
//                 document.querySelector(`.auth-tab[data-tab="login"]`).click();
//             }
//         } catch (err) {
//             console.error('Error during registration:', err);
//             alert('Error during registration: ' + err.message);
//         }
//     });

//     // Login
//     document.getElementById('login-form').addEventListener('submit', async function (e) {
//         e.preventDefault();
//         const email = document.getElementById('login-email').value;
//         const password = document.getElementById('login-password').value;

//         if (!email || !password) {
//             alert('Please fill in all fields');
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:5500/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 alert(`Login failed: ${errorData.message}`);
//             } else {
//                 const data = await response.json();

//                 // Save userId to localStorage if login is successful
//                 localStorage.setItem('userId', data.userId);

//                 alert(data.message);
//                 window.location.href = "/home/home.html"; // Redirect to home.html after successful login
//             }
//         } catch (err) {
//             console.error('Error during login:', err);
//             alert('Error during login: ' + err.message);
//         }
//     });
    
//     // Frontend: Get session duration
// // Example: Trigger when the user leaves the page or after some time
// const userId = localStorage.getItem('userId');

// // Simulate session end (e.g., when the user closes the tab)
// window.addEventListener("beforeunload", function (event) {
//     const userId = localStorage.getItem('userId'); // Assume you store the user ID in localStorage on successful login
    
//     if (userId) {  
          
//     }
// });
// });

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabName = this.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            forms.forEach(form => form.classList.remove('active'));
            document.getElementById(`${tabName}-form`).classList.add('active');
        });
    });

    // Switch tab links
    document.querySelectorAll('.switch-tab').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            document.querySelector(`.auth-tab[data-tab="${tabName}"]`).click();
        });
    });

    // Password strength validation
    function isPasswordStrong(password) {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#\$%\^\&*\)\(+=._-]/.test(password);

        return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    }

    // Register
    document.getElementById('register-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;

        if (!name || !email || !password || !confirm) {
            alert('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }

        if (!isPasswordStrong(password)) {
            alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5500/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(`Registration failed: ${data.message}`);
            } else {
                alert(data.message);
                document.querySelector(`.auth-tab[data-tab="login"]`).click();
            }
        } catch (err) {
            console.error('Error during registration:', err);
            alert('Error during registration: ' + err.message);
        }
    });

    // Login
    document.getElementById('login-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:5500/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message}`);
            } else {
                const data = await response.json();
                localStorage.setItem('userId', data.userId);
                alert(data.message);
                window.location.href = "/home/home.html";
            }
        } catch (err) {
            console.error('Error during login:', err);
            alert('Error during login: ' + err.message);
        }
    });

    // Track session end
    window.addEventListener("beforeunload", function () {
        const userId = localStorage.getItem('userId');
        if (userId) {
            // You can enable logout request here if needed
        }
    });
});
