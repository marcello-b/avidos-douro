// Cookie Consent
(function() {
  const cookieConsent = document.getElementById('cookieConsent');
  if (!cookieConsent) return;
  
  const acceptBtn = document.getElementById('acceptCookies');
  const rejectBtn = document.getElementById('rejectCookies');
  const closeBtn = document.querySelector('.cookie-close');
  
  // Check if user has already responded
  const cookieResponse = localStorage.getItem('cookieConsent');
  
  if (!cookieResponse) {
    cookieConsent.classList.remove('hidden');
    // Clear age verification when showing cookie consent
    localStorage.removeItem('ageVerified');
  } else {
    // If cookies were accepted/rejected, show age gate
    const ageGate = document.getElementById('ageGate');
    if (ageGate) {
      const isVerified = localStorage.getItem('ageVerified');
      if (!isVerified) {
        ageGate.classList.remove('hidden');
      }
    }
  }
  
  function handleResponse(accepted) {
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'rejected');
    cookieConsent.classList.add('hidden');
    
    // Show age gate after cookie consent
    const ageGate = document.getElementById('ageGate');
    if (ageGate) {
      ageGate.classList.remove('hidden');
    }
  }
  
  acceptBtn.addEventListener('click', () => handleResponse(true));
  rejectBtn.addEventListener('click', () => handleResponse(false));
  closeBtn.addEventListener('click', () => handleResponse(false));
})();
