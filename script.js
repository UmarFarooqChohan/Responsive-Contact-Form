const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);

  // Validate email format before sending
  const email = (formData.get('email') || '').trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return showMessage('Please enter a valid email address.', 'red');
  }

  try {
    const resp = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (resp.ok) {
      showMessage('✅ Your message has been sent successfully!', 'green');
      contactForm.reset();
      return;
    }

    // Try to show server-provided error details
    let msg = `❌ Error ${resp.status}`;
    try {
      const data = await resp.json();
      if (data && data.errors && data.errors.length) {
        msg = '❌ ' + data.errors.map(e => e.message).join(', ');
      }
    } catch {}

    showMessage(msg, 'red');

  } catch (err) {
    showMessage('❌ Network error. Please try again.', 'red');
  }
});

function showMessage(text, color) {
  formMessage.textContent = text;
  formMessage.style.color = color;
  formMessage.style.opacity = '1';
  setTimeout(() => formMessage.style.opacity = '0', 4000);
}
