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

function animateCounter({
  elementId,
  endValue,
  duration = 2000,
  decimals = 0,
}) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let current = 0;
  const intervalTime = 40;
  const totalSteps = Math.max(1, Math.floor(duration / intervalTime));
  const step = endValue / totalSteps;

  const interval = setInterval(() => {
    current += step;

    if (current >= endValue) {
      current = endValue;
      clearInterval(interval);
    }

    if (decimals > 0) {
      el.innerText = current.toFixed(decimals);
    } else {
      el.innerText = Math.round(current).toLocaleString();
    }
  }, intervalTime);
}

// Discover Featured Homes
const allCards = document.querySelectorAll(".slider-card");
const cardContainer = document.getElementById("card-container");
const cardHeight = document.getElementById("cardHeight").offsetHeight;
const seeMore = document.getElementById("see-more-btn");
let isExpanded = false;

cardContainer.style.height = `${cardHeight + 50}px`;

 seeMore.addEventListener("click", function(){
  if(!isExpanded){
    cardContainer.style.height = `${2 * (cardHeight + 50)}px`;
    isExpanded = true;
  }else{
    cardContainer.style.height = `${cardHeight + 50}px`;
    isExpanded = false;
  }
 })

allCards.forEach((card) => {
  const gallery = card.querySelector(".image-gallery");
  const prevBtn = card.querySelector(".prev-btn");
  const nextBtn = card.querySelector(".next-btn");
  const images = card.querySelectorAll(".snap-start");

  if (!gallery || !prevBtn || !nextBtn || !images.length) return;

  const getStep = () => images[0].clientWidth || gallery.clientWidth;
  const getMaxScroll = () => gallery.scrollWidth - gallery.clientWidth;

  nextBtn.addEventListener("click", () => {
    const step = getStep();
    const maxScroll = getMaxScroll();

    if (gallery.scrollLeft >= maxScroll - 2) {
      gallery.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      gallery.scrollBy({
        left: step,
        behavior: "smooth",
      });
    }
  });


  prevBtn.addEventListener("click", () => {
    const step = getStep();
    const maxScroll = getMaxScroll();

    if (gallery.scrollLeft <= 2) {
      gallery.scrollTo({
        left: maxScroll,
        behavior: "smooth",
      });
    } else {
      gallery.scrollBy({
        left: -step,
        behavior: "smooth",
      });
    }
  });
});

const aboutOverFlow = document.getElementById("aboutOverFlow");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter({
          elementId: "count-1",
          endValue: 5300,
          duration: 2000,
          decimals: 0,
        });
        animateCounter({
          elementId: "count-2",
          endValue: 2600,
          duration: 2000,
          decimals: 0,
        });
        animateCounter({
          elementId: "count-3",
          endValue: 4.85,
          duration: 2000,
          decimals: 2,
        });
        animateCounter({
          elementId: "count-4",
          endValue: 10,
          duration: 2000,
          decimals: 0,
        });

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
  },
);

// observer.observe(aboutOverFlow);
