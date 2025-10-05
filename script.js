// Mobile menu toggle functionality
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  // update ARIA for accessibility
  mobileMenu.setAttribute(
    "aria-hidden",
    mobileMenu.classList.contains("active") ? "false" : "true"
  );
});

// Allow keyboard toggle of hamburger (enter/space)
hamburger.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    hamburger.click();
  }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll("a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", function () {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileMenu.setAttribute("aria-hidden", "true");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileMenu.setAttribute("aria-hidden", "true");
  }
});

// Download button interactions (Displays an alert instead of starting a download)
const appStoreBtn = document.getElementById("app-store-btn");
const playStoreBtn = document.getElementById("play-store-btn");

appStoreBtn.addEventListener("click", function (e) {
  e.preventDefault();
  alert("App Store download would start here! 🚀");
  console.log("App Store button clicked");
});

playStoreBtn.addEventListener("click", function (e) {
  e.preventDefault();
  alert("Google Play Store download would start here! 📱");
  console.log("Google Play Store button clicked");
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll-triggered animation for feature cards and testimonials
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px", // Start animation 50px before it hits the bottom of the viewport
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      // Stop observing after the element has appeared once
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Prepare elements for animation and start observing
document.querySelectorAll(".feature-card, .testimonial").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});
