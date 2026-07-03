/* ==========================================================================
   quote.js — quote/contact form validation, upload preview & success modal
   ========================================================================== */
(function () {
  const forms = document.querySelectorAll("[data-validate-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    const uploadBox = form.querySelector(".upload-box");
    const uploadInput = form.querySelector('input[type="file"]');

    if (uploadBox && uploadInput) {
      uploadBox.addEventListener("click", () => uploadInput.click());
      uploadInput.addEventListener("change", () => {
        const label = uploadBox.querySelector("span");
        if (uploadInput.files.length) {
          label.textContent = `${uploadInput.files.length} file(s) selected — ${uploadInput.files[0].name}`;
        }
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll("[required]").forEach((field) => {
        field.classList.remove("is-invalid");
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = "var(--danger)";
        } else {
          field.style.borderColor = "";
        }
      });

      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value);
        if (!ok) {
          valid = false;
          emailField.style.borderColor = "var(--danger)";
        }
      }

      if (!valid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.classList.add("is-loading");

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          submitBtn.classList.remove("is-loading");
          if (response.ok) {
            form.reset();
            const label = form.querySelector(".upload-box span");
            if (label) label.textContent = "Click to upload a photo of the issue (optional)";
            openResultModal(true, form.getAttribute("data-success-title"), form.getAttribute("data-success-message"));
          } else {
            openResultModal(false);
          }
        })
        .catch(() => {
          submitBtn.classList.remove("is-loading");
          openResultModal(false);
        });
    });
  });

  function openResultModal(success, title, message) {
    let modal = document.querySelector(".form-success-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "form-success-modal";
      modal.innerHTML = `
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <button class="modal-close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <div class="modal-icon" id="modalIcon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <h3 id="modalTitle">Request received</h3>
          <p id="modalMessage">Thank you — our team will contact you shortly to confirm the details.</p>
          <button class="btn btn-primary modal-ok">Done</button>
        </div>
      `;
      document.body.appendChild(modal);
      modal.querySelector(".modal-close").addEventListener("click", () => modal.classList.remove("is-open"));
      modal.querySelector(".modal-ok").addEventListener("click", () => modal.classList.remove("is-open"));
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("is-open");
      });
    }

    const icon = modal.querySelector("#modalIcon");
    const titleEl = modal.querySelector("#modalTitle");
    const messageEl = modal.querySelector("#modalMessage");

    if (success) {
      icon.style.background = "rgba(27,138,90,0.1)";
      icon.style.color = "var(--success)";
      icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
      titleEl.textContent = title || "Request received";
      messageEl.textContent = message || "Thank you — our team will contact you shortly to confirm the details.";
    } else {
      icon.style.background = "rgba(193,68,60,0.1)";
      icon.style.color = "var(--danger)";
      icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01"/><circle cx="12" cy="12" r="10"/></svg>';
      titleEl.textContent = "Something went wrong";
      messageEl.textContent = "We couldn't send your request. Please call us directly at 0793 016 084, or try again in a moment.";
    }

    modal.classList.add("is-open");
  }
})();
