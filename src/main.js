document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Плавный скролл (Lenis) ---
  const lenis = new Lenis();
  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // --- 2. Мобильное меню ---
  const burger = document.getElementById('burger-menu');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');

  const toggleMenu = () => {
      burger.classList.toggle('is-active');
      nav.classList.toggle('is-open');
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  };

  burger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (nav.classList.contains('is-open')) toggleMenu();
      });
  });

  // --- 3. Шапка при скролле ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 50);
  });

  // --- 4. Hero Animation (Reveal) ---
  const initHero = () => {
      const hero = document.querySelector('.hero');
      const revealTexts = document.querySelectorAll('.reveal-text');
      revealTexts.forEach(el => {
          el.innerHTML = `<span>${el.innerText}</span>`;
      });
      setTimeout(() => hero.classList.add('is-visible'), 100);
  };
  initHero();

  // --- 5. Скролл-анимации (Intersection Observer) ---
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('active');
      });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

  // --- 6. Интерактив в Benefits ---
  const benefitItems = document.querySelectorAll('.benefit-item');
  const statusText = document.getElementById('status-text');

  benefitItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
          statusText.style.opacity = '0';
          setTimeout(() => {
              statusText.innerText = item.getAttribute('data-status');
              statusText.style.opacity = '1';
          }, 200);
      });
  });

  // --- 7. Контактная форма ---
  const form = document.getElementById('ai-contact-form');
  if (form) {
      const phoneInput = document.getElementById('phone');
      const captchaLabel = document.getElementById('captcha-question');
      const messageBox = document.getElementById('form-message');

      let n1 = Math.floor(Math.random() * 10), n2 = Math.floor(Math.random() * 10);
      let correctSum = n1 + n2;
      captchaLabel.innerText = `${n1} + ${n2} = `;

      phoneInput.addEventListener('input', (e) => e.target.value = e.target.value.replace(/\D/g, ''));

      form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (parseInt(document.getElementById('captcha-answer').value) !== correctSum) {
              messageBox.innerText = 'Неверная капча';
              messageBox.className = 'form-message error';
              return;
          }

          const btn = form.querySelector('button');
          btn.disabled = true; btn.innerText = 'Отправка...';

          setTimeout(() => {
              messageBox.innerText = 'Успешно отправлено!';
              messageBox.className = 'form-message success';
              form.reset();
              btn.disabled = false; btn.innerText = 'Начать сейчас';
          }, 1500);
      });
  }

  // --- 8. Cookie Popup ---
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptBtn = document.getElementById('accept-cookies');

  if (!localStorage.getItem('astro_cookies_accepted')) {
      setTimeout(() => cookiePopup.classList.add('is-visible'), 2000);
  }

  acceptBtn.addEventListener('click', () => {
      localStorage.setItem('astro_cookies_accepted', 'true');
      cookiePopup.classList.remove('is-visible');
  });
});