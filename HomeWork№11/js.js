document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('myForm');
  const nicknameInput = document.getElementById('nickname');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const submitBtn = document.getElementById('submitBtn');

  function checkFormValidity() {
    const isNicknameValid = nicknameInput.checkValidity();
    const isEmailValid = emailInput.checkValidity();
    const isPhoneValid = phoneInput.checkValidity();
    submitBtn.disabled = !(isNicknameValid && isEmailValid && isPhoneValid);
  }

  nicknameInput.addEventListener('input', checkFormValidity);
  emailInput.addEventListener('input', checkFormValidity);
  phoneInput.addEventListener('input', checkFormValidity);

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    alert("Форма успішно відправлена!");
    form.reset();
    submitBtn.disabled = true;
  });
});
