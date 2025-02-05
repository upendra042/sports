document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Redirect to the appropriate dashboard
                    window.location.href = data.redirectUrl;
                } else {
                    // Show error message
                    alert(data.error);
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login');
            }
        });
    }
});