// app.js — логика формы и анимации при скролле

document.addEventListener('DOMContentLoaded', function() {
  // Форма обратного звонка
  const form = document.getElementById('callbackForm');
  const messageEl = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Получаем значения полей
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const time = document.getElementById('time').value.trim();

      // Простая валидация
      if (!name || !phone || !time) {
        messageEl.textContent = 'Пожалуйста, заполните все поля.';
        messageEl.style.color = '#b33';
        return;
      }

      // Имитация отправки данных (в реальном проекте — fetch на сервер)
      messageEl.textContent = `Спасибо, ${name}! Мы позвоним вам в ${time}.`;
      messageEl.style.color = '#2e7d32';

      // Очистка полей (опционально)
      form.reset();

      // Сброс сообщения через 8 секунд
      setTimeout(() => {
        messageEl.textContent = '';
      }, 8000);
    });
  }

  // Плавный скролл для якорей (уже есть scroll-behavior: smooth, но продублируем для старых браузеров)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Небольшая анимация появления элементов при скролле (Intersection Observer)
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Применяем к карточкам и блокам, которые ещё не анимированы
  document.querySelectorAll('.product-card, .about-grid, .order-wrapper, .contacts-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    animateOnScroll.observe(el);
  });

  // Дополнительная анимация для заголовков секций
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(title);
  });
});