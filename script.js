const message = "Oi Erick, quero reservar minha vaga no EncontraR Trufas em tensão.";
const reservationUrl = `https://api.whatsapp.com/send?phone=5511982129999&text=${encodeURIComponent(message)}`;
document.querySelectorAll("[data-reserve]").forEach((link) => {
  link.href = reservationUrl;
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
}

const header = document.querySelector(".site-header");
const progress = document.querySelector(".scroll-progress");
const images = document.querySelectorAll("[data-parallax]");
function updateScroll() {
  header.classList.toggle("scrolled", window.scrollY > 24);
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height > 0 ? window.scrollY / height * 100 : 0}%`;
  images.forEach((image) => {
    const rect = image.parentElement.getBoundingClientRect();
    if (reducedMotion.matches || window.innerWidth < 700) {
      image.style.transform = "none";
    } else if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const offset = Math.max(-25, Math.min(25, rect.top * -0.04));
      image.style.transform = `translateY(${offset}px)`;
    }
  });
}
let scheduled = false;
window.addEventListener("scroll", () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    updateScroll();
    scheduled = false;
  });
}, { passive: true });
window.addEventListener("resize", updateScroll);
reducedMotion.addEventListener("change", updateScroll);
updateScroll();
