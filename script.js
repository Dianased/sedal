// ================= HERO ПАРАЛЛАКС =================
const heroBg = document.querySelector(".hero-bg");
const footerImg = document.querySelector(".footer-image");

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  if (heroBg) {
    heroBg.style.transform = `translateY(${scroll * 0.3}px) scale(1.1)`;
  }

  if (footerImg && window.innerWidth > 700) {
    footerImg.style.transform = `translateY(${scroll * -0.05 - 120}px)`;
  }

  revealOnScroll();
});

// ================= МЫШЬ ЭФФЕКТ =================
const heroTitle = document.querySelector(".hero-title");

window.addEventListener("mousemove", (e) => {
  if (!heroTitle) return;

  let x = (e.clientX / window.innerWidth - 0.5) * 20;
  let y = (e.clientY / window.innerHeight - 0.5) * 20;

  heroTitle.style.transform = `translate(${x}px, ${y}px)`;
});

// ================= КНОПКА =================
const btn = document.getElementById("wow-btn");

if (btn) {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0) scale(1)";
  });

  btn.addEventListener("click", () => {
    btn.style.transform = "scale(0.9)";

    setTimeout(() => {
      btn.style.transform = "scale(1)";
      window.location.href = "/how-we-work.html";
    }, 150);
  });
}

// ================= REVEAL =================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const trigger = window.innerHeight - 100;

    if (top < trigger) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("load", revealOnScroll);

// ================= TEAM 3D КАРУСЕЛЬ + ТЕКСТ =================
const track = document.getElementById("track3d");

if (track) {
  const slides = track.querySelectorAll("img");
  let index = 0;

  const teamData = [
    {
      text: "Работаем на месте: поставщики, проверки, переговоры, упаковка и отправка — всё под контролем.",
      badges: [
        "Проверка товара",
        "Работа напрямую с фабриками",
        "Контроль на месте",
      ],
    },
    {
      text: "Лично проверяем качество товара перед отправкой и фиксируем всё на фото и видео для клиента.",
      badges: ["Фотоотчёт", "Видеоотчёт", "Контроль качества"],
    },
    {
      text: "Ведём переговоры с поставщиками, согласовываем условия и помогаем получить выгодные решения.",
      badges: ["Переговоры", "Оптовые цены", "Работа с фабриками"],
    },
  ];

  const teamDescription = document.getElementById("teamDescription");
  const teamBadges = document.getElementById("teamBadges");

  function updateTeamInfo() {
    if (teamDescription) {
      teamDescription.textContent = teamData[index].text;
    }

    if (teamBadges) {
      teamBadges.innerHTML = "";

      teamData[index].badges.forEach((badge) => {
        const span = document.createElement("span");
        span.textContent = badge;
        teamBadges.appendChild(span);
      });
    }
  }

  function update3D() {
    slides.forEach((img, i) => {
      img.classList.remove("active", "left", "right", "hidden");

      if (i === index) {
        img.classList.add("active");
      } else if (i === (index - 1 + slides.length) % slides.length) {
        img.classList.add("left");
      } else if (i === (index + 1) % slides.length) {
        img.classList.add("right");
      } else {
        img.classList.add("hidden");
      }
    });

    updateTeamInfo();
  }

  const nextBtn = track.querySelector(".next");
  const prevBtn = track.querySelector(".prev");

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    update3D();
  });

  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    update3D();
  });

  // 📱 свайп
  let startX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    let diff = e.changedTouches[0].clientX - startX;

    if (diff > 50) index--;
    if (diff < -50) index++;

    index = (index + slides.length) % slides.length;
    update3D();
  });

  // авто-слайд
  setInterval(() => {
    index = (index + 1) % slides.length;
    update3D();
  }, 4000);

  update3D();
}

