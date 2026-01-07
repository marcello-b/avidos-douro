// Accordion functionality for Vintage Tabs
(function() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  if (accordionItems.length === 0) return;
  
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Close all other items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          otherContent.style.maxHeight = null;
        }
      });
      
      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
  
  // Open first item by default
  if (accordionItems.length > 0) {
    const firstItem = accordionItems[0];
    const firstContent = firstItem.querySelector('.accordion-content');
    firstItem.classList.add('active');
    firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }
})();
