// Get references to the form and feedback elements
const form = document.getElementById('contactForm');
const feedback = document.getElementById('feedback');
const submitButton = document.getElementById('submitBtn');


//Listen for form submission
form.addEventListener('submit', async (e) => {
e.preventDefault(); // Prevent default form submission 
});


//get form data
const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const subject = document.getElementById('subject').value.trim();
const message = document.getElementById('message').value.trim();


//javascript validation
if (name.length < 3 || !email || !subject || message.length < 10) {
feedback.textContent = 'Please fill in all fields with valid information.';
feedback.className = 'alert alert-danger';
return;
}

//store form data in an object
const formData = {
name,
email,
subject,
message
};


try {
//show loading message
submitButton.disabled = true;
feedback.textContent = 'Submitting...';
feedback.className = 'alert alert-info mt-3';

//send form data to backend
const response = await fetch('http://localhost:5500/api/contact', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(formData)
});

//response from backend
const result = await response.json();

//check response status
if (response.ok) {
feedback.textContent = result.message;
feedback.className = 'alert alert-success mt-3';
form.reset();

//reset form fields
} else {
feedback.textContent = result.message || 'An error occurred. Please try again.';
feedback.className = 'alert alert-danger mt-3';
}
} catch (error) {
feedback.textContent = 'An error occurred. Please try again.';
feedback.className = 'alert alert-danger mt-3';
}finally {
submitButton.disabled = false;
submitButton.textContent = 'Send Message'; //enable submit button
}