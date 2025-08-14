document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.menu-overlay');
  const closeBtn = document.querySelector('.menu-close');

  hamburger.addEventListener('click', () => {
    overlay.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  document.querySelectorAll('.menu-overlay a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  });
});
