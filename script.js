const menuIcon = document.getElementById("menu-icon");
const nav = document.getElementById("nav");
const removeIcon = document.getElementById("remove-nav");
const navItems = document.querySelectorAll("#nav-lists > li");

const openNav = () => nav.classList.remove("max-lg:-translate-x-full");
const closeNav = () => nav.classList.add("max-lg:-translate-x-full");

menuIcon?.addEventListener("click", openNav);
removeIcon?.addEventListener("click", closeNav);

// Close mobile drawer when clicking outside
document.addEventListener("click", (e) => {
  if (
    window.innerWidth < 1024 &&
    !nav.classList.contains("max-lg:-translate-x-full") &&
    !nav.contains(e.target) &&
    !menuIcon.contains(e.target)
  ) {
    closeNav();
    toggleDropdown();
  }
});

// Toggle submenus on mobile (< 1024px)
navItems.forEach((item) => {
  const toggleBtn = item.querySelector(".submenu-toggle");
  const submenu = item.querySelector(".submenu");
  const icon = item.querySelector(".submenu-icon");

  toggleBtn?.addEventListener("click", () => {
    if (window.innerWidth >= 1024 || !submenu) return;

    const isOpen = !submenu.classList.contains("hidden");
    submenu.classList.toggle("hidden", isOpen);
    icon?.classList.toggle("rotate-180", !isOpen);
  });
});

const dropdown = document.getElementById("dropdown");
const dropdownBtn = document.getElementById("dropdownBtn");
const wrapper = document.getElementById("categoryDropdown");

// Toggle dropdown
dropdownBtn.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// Close when clicking outside
document.addEventListener("click", (event) => {
  if (!wrapper.contains(event.target)) {
    dropdown.classList.add("hidden");
  }
});

// Select an option
dropdown.querySelectorAll("div").forEach((option) => {
  option.addEventListener("click", () => {
    dropdownBtn.textContent = option.textContent.trim();
    dropdown.classList.add("hidden");
  });
});

const allDropdowns = document.querySelectorAll(".custom-dropdown");

allDropdowns.forEach((wrapper) => {
  const btn = wrapper.querySelector(".dropdownBtn");
  const dropdown = wrapper.querySelector(".dropdown");
  const options = dropdown.querySelectorAll("div");

  // Toggle dropdown
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    // Close other dropdowns
    allDropdowns.forEach((item) => {
      if (item !== wrapper) {
        item.querySelector(".dropdown").classList.add("hidden");
      }
    });

    dropdown.classList.toggle("hidden");
  });

  // Select option
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const selected = option.textContent.trim();

      btn.textContent = selected;

      dropdown.classList.add("hidden");
    });
  });
});

// Close when clicking outside
document.addEventListener("click", () => {
  allDropdowns.forEach((wrapper) => {
    wrapper.querySelector(".dropdown").classList.add("hidden");
  });
});

// Slider

const slider = document.getElementById("cardSlider");
let isDown = false;
let startX = 0;
let scrollLeft = 0;
const cards = slider.querySelectorAll(".slider-card");
const indicatorContaner = document.getElementById("indicatorContaner");

// Mouse Drag Start
slider.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return;

  isDown = true;
  startX = e.pageX;
  scrollLeft = slider.scrollLeft;

  slider.style.scrollSnapType = "none";
  slider.style.scrollBehavior = "auto";
});

// Mouse Move
window.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  e.preventDefault();

  const walk = e.pageX - startX;

  slider.scrollLeft = scrollLeft - walk;
});

// Mouse Release
window.addEventListener("mouseup", () => {
  if (!isDown) return;

  isDown = false;

  slider.style.scrollSnapType = "x mandatory";
  slider.style.scrollBehavior = "smooth";

  // Find nearest card
  let closestCard = null;
  let minDistance = Infinity;

  const sliderCenter =
    slider.getBoundingClientRect().left + slider.clientWidth / 2;

  cards.forEach((card) => {
    const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;

    const distance = Math.abs(sliderCenter - cardCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closestCard = card;
    }
  });

  // Center the nearest card
  if (closestCard) {
    slider.scrollTo({
      left:
        closestCard.offsetLeft +
        closestCard.offsetWidth / 2 -
        slider.clientWidth / 2,
      behavior: "smooth",
    });
  }
});

// Mouse leaves slider
slider.addEventListener("mouseleave", () => {
  if (!isDown) return;
});

let autoScroll;

function startAutoScroll() {
  autoScroll = setInterval(() => {
    const cardWidth = cards[0].offsetWidth + 16;

    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
      slider.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      slider.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  }, 2500);
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

startAutoScroll();

const controllRight = document.getElementById("scrollRight");
const controllLeft = document.getElementById("scrollLeft");

function scrollManuallyR() {
  const cardWidth = cards[0].offsetWidth + 16;

  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
    slider.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  } else {
    slider.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });
  }
}

function scrollManuallyL() {
  const cardWidth = cards[0].offsetWidth + 16;

  if (slider.scrollLeft <= 10) {
    slider.scrollTo({
      left: slider.scrollWidth,
      behavior: "smooth",
    });
  } else {
    slider.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });
  }
}

controllRight.addEventListener("click", scrollManuallyR);
controllLeft.addEventListener("click", scrollManuallyL);


