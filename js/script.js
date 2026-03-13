function initSwiper() {
  const sliderEl = document.querySelector(".slider-wrapper");
  if (!sliderEl || typeof Swiper === "undefined") return;

  new Swiper(sliderEl, {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
}

function initFormValidation() {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false,
    );
  });
}

function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;
  contactForm.addEventListener("submit", function (event) {
    if (this.checkValidity()) {
      event.preventDefault();
      const btn = this.querySelector("button");
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Sent!';
        btn.classList.replace("Deep-Cyan", "btn-success");
        this.reset();
        this.classList.remove("was-validated");

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.replace("btn-success", "Deep-Cyan");
          btn.disabled = false;
        }, 3000);
      }, 2000);
    }
  });
}

const speed = 200;

function animateCounter(counter) {
  const target = +counter.innerText.replace(/,/g, "");
  let count = +counter.getAttribute("data-count") || 0;
  const inc = target / speed;

  function step() {
    if (count < target) {
      count = Math.ceil(count + inc);
      counter.setAttribute("data-count", count);
      counter.innerText = count.toLocaleString();
      requestAnimationFrame(step);
    } else {
      counter.innerText = target.toLocaleString();
    }
  }
  requestAnimationFrame(step);
}

function startCounters() {
  const counters = document.querySelectorAll("h2.fw-bold.mb-0");
  counters.forEach((counter) => animateCounter(counter));
}

function startCountersIfVisible() {
  const counters = document.querySelectorAll("h2.fw-bold.mb-0");
  counters.forEach((counter) => {
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      animateCounter(counter);
      counter.dataset.started = "true";
    }
  });
}

function initCountersObserver() {
  const counters = document.querySelectorAll("h2.fw-bold.mb-0");
  if (!counters.length) return;

  const observerOptions = { threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.started) {
        entry.target.dataset.started = "true";
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => observer.observe(counter));
}

function initNavbarScroll() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled", "shadow-lg");
    } else {
      nav.classList.remove("scrolled", "shadow-lg");
    }
  });
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

function initAll() {
  initSwiper();
  initFormValidation();
  initContactForm();
  initCountersObserver();
  initNavbarScroll();
  initSmoothScrolling();
}

document.addEventListener("DOMContentLoaded", initAll);
