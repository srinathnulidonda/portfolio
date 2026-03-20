/* static/js/contact.js */
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_1atiujn',        
    OWNER_TEMPLATE_ID: 'template_tl8dokg', 
    CONFIRMATION_TEMPLATE_ID: 'template_5uil1fx', 
    PUBLIC_KEY: 'PDZrWzWCWkcVj-8oj'         
};

(function () {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const spinner = document.getElementById('loading-spinner');
  const sendIcon = document.getElementById('send-icon');
  const btnText = submitBtn.querySelector('.btn-text');
  const textarea = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  const progressFill = document.getElementById('progress-fill');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  textarea.addEventListener('input', function () {
    const len = this.value.length;
    const pct = (len / 500) * 100;
    charCount.textContent = len;
    progressFill.style.width = pct + '%';
    progressFill.style.backgroundColor = pct < 50 ? '#28a745' : pct < 80 ? '#ffc107' : '#dc3545';
  });

  function validate() {
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    [
      [nameInput, v => v.trim().length >= 2],
      [emailInput, v => emailRegex.test(v.trim())],
      [textarea, v => v.trim().length >= 10]
    ].forEach(([field, test]) => {
      if (test(field.value)) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
      } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        valid = false;
      }
    });

    return valid;
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    btnText.textContent = loading ? 'Sending...' : 'Send Message';
    spinner.style.display = loading ? 'inline-block' : 'none';
    sendIcon.style.display = loading ? 'none' : 'inline';
    submitBtn.classList.toggle('loading', loading);
  }

  function showModal(type, title, body, actions) {
    const id = `${type}Modal`;
    document.getElementById(id)?.remove();
    const color = type === 'success' ? 'success' : 'danger';
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal fade" id="${id}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow-lg" style="border-radius:1rem">
            <div class="modal-header border-0 text-center">
              <div class="w-100">
                <div class="mb-3" style="animation:scaleIn .5s ease-out"><i class="fas fa-${icon} text-${color}" style="font-size:4rem"></i></div>
                <h4 class="modal-title text-${color} fw-bold">${title}</h4>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">${body}</div>
            <div class="modal-footer border-0 justify-content-center">${actions}</div>
          </div>
        </div>
      </div>`);
    new bootstrap.Modal(document.getElementById(id)).show();
    document.getElementById(id).addEventListener('hidden.bs.modal', function () { this.remove(); });
  }

  function showSuccess() {
    showModal('success', 'Message Sent Successfully!',
      `<p class="mb-3 text-muted">Thank you for reaching out! Your message has been successfully sent.</p>
       <p class="mb-0"><small class="text-muted"><i class="fas fa-envelope me-2"></i>A confirmation email has been sent to your email address.<br><i class="fas fa-clock me-2"></i>I'll get back to you within 24 hours!</small></p>`,
      `<button type="button" class="btn btn-primary rounded-pill px-4" data-bs-dismiss="modal"><i class="fas fa-thumbs-up me-2"></i>Awesome!</button>`
    );
  }

  function showError(msg = 'Failed to send message. Please try again.') {
    showModal('error', 'Oops! Something went wrong',
      `<p class="mb-3 text-muted">${Utils.escapeHtml(msg)}</p>
       <p class="mb-0"><small class="text-muted"><i class="fas fa-envelope me-2"></i>You can also reach me directly at: <a href="mailto:srinathnulidonda@gmail.com" class="text-primary">srinathnulidonda@gmail.com</a></small></p>`,
      `<button type="button" class="btn btn-outline-primary rounded-pill px-4 me-2" data-bs-dismiss="modal">Try Again</button>
       <a href="mailto:srinathnulidonda@gmail.com" class="btn btn-primary rounded-pill px-4"><i class="fas fa-envelope me-2"></i>Email Directly</a>`
    );
  }

  async function sendOwnerEmail(data) {
    return emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.OWNER_TEMPLATE_ID, {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_name: 'Srinath Nulidonda',
      to_email: 'srinathnulidonda@gmail.com',
      reply_to: data.email,
      subject: `New Contact Form Message from ${data.name}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    });
  }

  async function sendConfirmation(data) {
    return emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.CONFIRMATION_TEMPLATE_ID, {
      to_name: data.name,
      to_email: data.email,
      from_name: 'Srinath Nulidonda',
      from_email: 'srinathnulidonda@gmail.com',
      user_message: data.message,
      date: new Date().toLocaleDateString(),
      reply_to: 'srinathnulidonda@gmail.com'
    });
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: textarea.value.trim()
    };

    setLoading(true);

    try {
      await Promise.all([sendOwnerEmail(data), sendConfirmation(data)]);
      form.reset();
      form.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
      charCount.textContent = '0';
      progressFill.style.width = '0%';
      showSuccess();
      Utils.trackEvent('contact_form_sent', { method: 'emailjs' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      showError(error.text || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  [nameInput, emailInput, textarea].forEach(field => {
    field.addEventListener('blur', function () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const tests = {
        name: v => v.trim().length >= 2,
        email: v => emailRegex.test(v.trim()),
        message: v => v.trim().length >= 10
      };
      const test = tests[this.id];
      if (test && test(this.value)) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
      }
    });
  });
});