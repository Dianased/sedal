const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");

const tgBtn = document.getElementById("tgBtn");
const waBtn = document.getElementById("waBtn");

const closeBtn = document.getElementById("closeModal");

// 👉 СЛАЙДЕР
const slides = document.getElementById("modalSlides");

let currentSlide = 0;
let startX = 0;

// ================= ОТКРЫТИЕ =================
document.querySelectorAll(".open-modal").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const id = btn.dataset.id;
    const product = document.getElementById(id);

    const title = product.dataset.title;
    /*const price = product.dataset.price;*/

    modalTitle.innerText = title;
    /*modalPrice.innerText = "Цена: " + price;*/
    modalDesc.innerHTML = product.innerHTML;

    // 🔥 КАРТИНКИ
    const images = btn.dataset.images.split(",");

    slides.innerHTML = images.map((src) => `<img src="${src}">`).join("");

    currentSlide = 0;
    updateSlider();

    tgBtn.href = `https://t.me/Aital07?text=Здравствуйте,%20интересует%20${title}`;

    // 🔥 WhatsApp
    waBtn.href = `https://wa.me/79245680007?text=Здравствуйте,%20интересует%20${title}`;

    modal.classList.add("active");
  });
});

// ================= ЗАКРЫТИЕ =================
closeBtn.onclick = () => modal.classList.remove("active");

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
};

// ================= СЛАЙДЕР =================
function updateSlider() {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// кнопки
document.querySelector(".next").onclick = () => {
  currentSlide++;
  if (currentSlide >= slides.children.length) currentSlide = 0;
  updateSlider();
};

document.querySelector(".prev").onclick = () => {
  currentSlide--;
  if (currentSlide < 0) currentSlide = slides.children.length - 1;
  updateSlider();
};

// свайп
slides.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", (e) => {
  let diff = e.changedTouches[0].clientX - startX;

  if (diff > 50) currentSlide--;
  if (diff < -50) currentSlide++;

  const total = slides.children.length;

  if (currentSlide < 0) currentSlide = 0;
  if (currentSlide >= total) currentSlide = total - 1;

  updateSlider();
});

const images = btn.dataset.images
  ? btn.dataset.images.split(",")
  : [product.dataset.img];
