document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.overlay-menu');

  hamburger.addEventListener('click', () => {
    overlay.style.display = (overlay.style.display === 'flex') ? 'none' : 'flex';
  });

  document.querySelectorAll('.overlay-menu a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.style.display = 'none';
    });
  });
});
