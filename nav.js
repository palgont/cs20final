function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.classList.toggle('show');
  }
}

function handleCredentialResponse(response) {
// Decode the JWT
const payload = JSON.parse(atob(response.credential.split('.')[1]));

console.log("User ID:", payload.sub);

// Save the user ID in localStorage with custom key
localStorage.setItem('nom_nom_nom_id', payload.sub);  // <<< customized

// Update UI: hide the sign-in button, show the sign-out button
const signInBtn = document.getElementById('gSignInBtn');
const signOutBtn = document.getElementById('signoutBtn');
if (signInBtn && signOutBtn) {
  signInBtn.style.display = 'none';
  signOutBtn.style.display = 'inline-block';
}

// NEW: Update the Order Button after login
const orderButton = document.getElementById('add');
if (orderButton) {
  orderButton.textContent = 'Order';
  orderButton.disabled = false;
  orderButton.style.backgroundColor = '#007BFF'; // Original blue color
}

// Save the user in MongoDB
fetch('/saveUser', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: payload.sub,
    email: payload.email,
    name: payload.name
  })
});
}

document.addEventListener('DOMContentLoaded', () => {
fetch('nav.html')
  .then(response => response.text())
  .then(html => {
    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
      placeholder.innerHTML = html;
    }
  })
  .then(() => {
    const signOutBtn = document.getElementById('signoutBtn');
    const signInBtnContainer = document.getElementById('gSignInBtn');
    const orderButton = document.getElementById('add'); 
    
    google.accounts.id.initialize({
      client_id: "1034974765274-vikmqleh69u79ht830g74tou5qjejker.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    
    // Customized key check
    const token = localStorage.getItem('nom_nom_nom_id');  // <<< customized
    if (token) {
      if (signOutBtn && signInBtnContainer) {
        signOutBtn.style.display = 'inline-block';
        signInBtnContainer.style.display = 'none';
      }
      // If user is signed in, make button normal
      if (orderButton) {
        orderButton.textContent = 'Order';
        orderButton.disabled = false;
        orderButton.style.backgroundColor = '#007BFF';
      }
    } else {
      if (signInBtnContainer) {
        google.accounts.id.renderButton(signInBtnContainer, { 
          size: "medium", text:"signin" 
        });
      }

      // If user is NOT signed in, disable order button
      if (orderButton) {
        orderButton.textContent = 'Please log in to order';
        orderButton.disabled = true;
        orderButton.style.backgroundColor = 'green';
      }
    }
    
    if (signOutBtn) {
      signOutBtn.addEventListener('click', () => {
        localStorage.removeItem('nom_nom_nom_id');    // <<< customized
        google.accounts.id.disableAutoSelect();
        signOutBtn.style.display = 'none';
        if (signInBtnContainer) {
          signInBtnContainer.style.display = 'inline-block';
          google.accounts.id.renderButton(signInBtnContainer, { size: "medium", text:"signin" });
        }

        // When user signs out, immediately update button
        const orderButton = document.getElementById('add');
        if (orderButton) {
          orderButton.textContent = 'Log in order';
          orderButton.disabled = true;
          orderButton.style.backgroundColor = 'green';
        }
        window.location.href = 'index.html'; 
      });
    }
  })
  .catch(err => {
    console.error("Error loading navigation bar:", err);
  });
});

