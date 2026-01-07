// Age Gate
(function() {
  const ageGate = document.getElementById('ageGate');
  if (!ageGate) return;
  
  const yesBtn = document.getElementById('ageYes');
  const noBtn = document.getElementById('ageNo');
  
  // Check if user is already verified
  const isVerified = localStorage.getItem('ageVerified');
  const cookieConsent = localStorage.getItem('cookieConsent');
  
  // Only show if cookies were accepted and age not verified
  if (cookieConsent && !isVerified) {
    ageGate.classList.remove('hidden');
  }
  
  yesBtn.addEventListener('click', () => {
    localStorage.setItem('ageVerified', 'true');
    ageGate.classList.add('hidden');
  });
  
  noBtn.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
})();
