// // nav.js - handles loading nav.html and Google Sign-In integration

// // Define the Google sign-in callback function to handle the credential response
// function handleCredentialResponse(response) {
//     console.log("Google ID token:", response.credential);
//     // Save the token (or user ID) in localStorage to remember the sign-in
//     localStorage.setItem('google_token', response.credential);
//     // Update UI: hide the sign-in button, show the sign-out button
//     const signInBtn = document.getElementById('gSignInBtn');
//     const signOutBtn = document.getElementById('signoutBtn');
//     if (signInBtn && signOutBtn) {
//       signInBtn.style.display = 'none';
//       signOutBtn.style.display = 'inline-block';
//     }
//   }
  
//   // When DOM is loaded, fetch the nav HTML and then initialize Google Sign-In
//   document.addEventListener('DOMContentLoaded', () => {
//     // Fetch the nav.html content
//     fetch('nav.html')
//       .then(response => response.text())
//       .then(html => {
//         // Insert the nav HTML into the placeholder
//         const placeholder = document.getElementById('nav-placeholder');
//         if (placeholder) {
//           placeholder.innerHTML = html;
//         }
//       })
//       .then(() => {
//         // Now nav is loaded into the page.
//         // Get references to the sign-in button container and sign-out button.
//         const signOutBtn = document.getElementById('signoutBtn');
//         const signInBtnContainer = document.getElementById('gSignInBtn');
        
//         // Initialize Google Identity Services library
//         google.accounts.id.initialize({
//           client_id: "1034974765274-vikmqleh69u79ht830g74tou5qjejker.apps.googleusercontent.com",  // TODO: replace with your actual client ID
//           callback: handleCredentialResponse   // callback to handle the token
//         });
        
//         // Determine if user is already signed in (token stored)
//         const token = localStorage.getItem('google_token');
//         if (token) {
//           // User is signed in, so show the Sign-Out button and skip rendering Sign-In button
//           if (signOutBtn && signInBtnContainer) {
//             signOutBtn.style.display = 'inline-block';
//             signInBtnContainer.style.display = 'none';
//           }
//         } else {
//           // User not signed in, render the Google Sign-In button
//           if (signInBtnContainer) {
//             const loginBtn = document.createElement('button');
//             loginBtn.id = "loginBtn"; // give it an ID
//             loginBtn.innerText = "Log In";
//             loginBtn.style.backgroundColor = "white";
//             loginBtn.style.color = "#379537";
//             loginBtn.style.fontFamily = "Open Sans";
//             loginBtn.style.fontSize = "20px";
//             loginBtn.style.padding = "10px 20px";
//             loginBtn.style.marginLeft = "10px";
//             loginBtn.style.borderRadius = "5px";
//             loginBtn.style.border = "none";
//             loginBtn.style.cursor = "pointer";
          
//             // Append it
//             signInBtnContainer.appendChild(loginBtn);
          
//             // Add click event to trigger Google Sign-In
//             loginBtn.addEventListener('click', () => {
//               google.accounts.id.prompt(); // Show the One Tap popup or auto-sign-in
//             });
          
//             // Add hover effects with JS if you want (optional) or just do it in CSS
//           }
//         }
        
//         // Optional: Prompt for One Tap sign-in if applicable (will show a one-tap prompt)
//         // google.accounts.id.prompt(); // you can enable this if you want the One Tap experience
//         // (We keep it commented to avoid unexpected pop-ups in this example.)
        
//         // Attach the sign-out button click handler
//         if (signOutBtn) {
//           signOutBtn.addEventListener('click', () => {
//             // User clicked sign out
//             localStorage.removeItem('google_token');     // clear token
//             google.accounts.id.disableAutoSelect();      // prevent auto-login
//             signOutBtn.style.display = 'none';            // hide signout
//             if (signInBtnContainer) {
//               signInBtnContainer.style.display = 'inline-block';
//               signInBtnContainer.innerHTML = ''; // clear old content
          
//               // Recreate the custom login button
//               const loginBtn = document.createElement('button');
//               loginBtn.id = "loginBtn";
//               loginBtn.innerText = "Log In";
//               loginBtn.style.backgroundColor = "white";
//               loginBtn.style.color = "#379537";
//               loginBtn.style.fontFamily = "Open Sans";
//               loginBtn.style.fontSize = "20px";
//               loginBtn.style.padding = "10px 20px";
//               loginBtn.style.marginLeft = "10px";
//               loginBtn.style.borderRadius = "5px";
//               loginBtn.style.border = "none";
//               loginBtn.style.cursor = "pointer";
          
//               signInBtnContainer.appendChild(loginBtn);
          
//               loginBtn.addEventListener('click', () => {
//                 google.accounts.id.prompt();
//               });
//             }
//           });          
//         }
//       })
//       .catch(err => {
//         console.error("Error loading navigation bar:", err);
//       });
//   });
  
  function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('show');
    }
}

function handleCredentialResponse(response) {
  console.log("Google ID token:", response.credential);
  // Save the token (or user ID) in localStorage to remember the sign-in
  localStorage.setItem('google_token', response.credential);
  // Update UI: hide the sign-in button, show the sign-out button
  const signInBtn = document.getElementById('gSignInBtn');
  const signOutBtn = document.getElementById('signoutBtn');
  if (signInBtn && signOutBtn) {
    signInBtn.style.display = 'none';
    signOutBtn.style.display = 'inline-block';
  }
}

// When DOM is loaded, fetch the nav HTML and then initialize Google Sign-In
document.addEventListener('DOMContentLoaded', () => {
  // Fetch the nav.html content
  fetch('nav.html')
    .then(response => response.text())
    .then(html => {
      // Insert the nav HTML into the placeholder
      const placeholder = document.getElementById('nav-placeholder');
      if (placeholder) {
        placeholder.innerHTML = html;
      }
    })
    .then(() => {
      // Now nav is loaded into the page.
      // Get references to the sign-in button container and sign-out button.
      const signOutBtn = document.getElementById('signoutBtn');
      const signInBtnContainer = document.getElementById('gSignInBtn');
      
      // Initialize Google Identity Services library
      google.accounts.id.initialize({
        client_id: "1034974765274-vikmqleh69u79ht830g74tou5qjejker.apps.googleusercontent.com",  // TODO: replace with your actual client ID
        callback: handleCredentialResponse   // callback to handle the token
      });
      
      // Determine if user is already signed in (token stored)
      const token = localStorage.getItem('google_token');
      if (token) {
        // User is signed in, so show the Sign-Out button and skip rendering Sign-In button
        if (signOutBtn && signInBtnContainer) {
          signOutBtn.style.display = 'inline-block';
          signInBtnContainer.style.display = 'none';
        }
      } else {
        // User not signed in, render the Google Sign-In button
        if (signInBtnContainer) {
          google.accounts.id.renderButton(signInBtnContainer, { 
            theme: "outline", size: "medium" 
          });
        }
      }
      
      // Optional: Prompt for One Tap sign-in if applicable (will show a one-tap prompt)
      // google.accounts.id.prompt(); // you can enable this if you want the One Tap experience
      // (We keep it commented to avoid unexpected pop-ups in this example.)
      
      // Attach the sign-out button click handler
      if (signOutBtn) {
        signOutBtn.addEventListener('click', () => {
          // User clicked sign out
          localStorage.removeItem('google_token');           // clear token from localStorage
          google.accounts.id.disableAutoSelect();            // instruct Google to disable automatic sign-in&#8203;:contentReference[oaicite:4]{index=4}
          // Update UI: hide sign-out, show sign-in button again
          signOutBtn.style.display = 'none';
          if (signInBtnContainer) {
            signInBtnContainer.style.display = 'inline-block';
            // Re-render the Google sign-in button (so that it can be clicked again to sign in)
            google.accounts.id.renderButton(signInBtnContainer, { theme: "outline", size: "medium" });
          }
        });
      }
    })
    .catch(err => {
      console.error("Error loading navigation bar:", err);
    });
});