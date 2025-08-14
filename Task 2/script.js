const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const fullName = formData.get('fullName').trim();
  const email = formData.get('_replyto').trim();
  const subject = formData.get('subject').trim();
  const message = formData.get('message').trim();

  if (!fullName || !email || !subject || !message) {
    formMessage.textContent = 'Please fill in all fields.';
    formMessage.style.color = 'red';
    return;
  }

  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.style.color = 'red';
    return;
  }

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  
  .then(response => {
    if (response.ok) {
      formMessage.textContent = 'Your message has been sent!';
      formMessage.style.color = 'green';
      contactForm.reset();
    } else {
      throw new Error('Network error');
    }
  })
  .catch(error => {
    formMessage.textContent = 'Something went wrong. Please try again.';
    formMessage.style.color = 'red';
  });
});
