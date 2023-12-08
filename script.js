const apiUrl = 'https://authenticationtask-production.up.railway.app/'; // Update with your backend API URL

    function showRegistrationForm() {
      document.getElementById('registrationForm').style.display = 'block';
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('forgotPasswordForm').style.display = 'none';
    }

    function showLoginForm() {
      document.getElementById('registrationForm').style.display = 'none';
      document.getElementById('loginForm').style.display = 'block';
      document.getElementById('forgotPasswordForm').style.display = 'none';
    }

    function showForgotPasswordForm() {
      document.getElementById('registrationForm').style.display = 'none';
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('forgotPasswordForm').style.display = 'block';
    }

    async function registerUser() {
      const username = document.getElementById('regUsername').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;

      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      document.getElementById('regMessage').innerText = data.message;

      

      // if (response.ok) {
        
      //   showLoginForm();
      // }
    }

    async function loginUser() {
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      document.getElementById('loginMessage').innerText = data.error || `Login successful with token ${data.message}`;
    }

    async function forgotPassword() {
      const email = document.getElementById('forgotEmail').value;

      const response = await fetch(`${apiUrl}/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      document.getElementById('forgotMessage').innerText = data.error || `${data.message}`;
    }
