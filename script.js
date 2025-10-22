
document.addEventListener("DOMContentLoaded", () => {

  const toggleBtn = document.getElementById("themeToggle");//For dark and light
  const toggleIcon = toggleBtn.querySelector("i");
  const toggleText = toggleBtn.querySelector("span");
  const body = document.body;


  function setMode(mode) {
    if (mode === "dark") {
      body.dataset.theme = "dark";
      toggleIcon.classList.remove("fa-moon");
      toggleIcon.classList.add("fa-sun");
      toggleText.textContent = " Light";
    } else {
      body.dataset.theme = "light";
      toggleIcon.classList.remove("fa-sun");
      toggleIcon.classList.add("fa-moon");
      toggleText.textContent = " Dark";
    }
  }

  const savedTheme = localStorage.getItem("theme"); //Using local storage (temprory)

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme) {
    setMode(savedTheme);//Checking Mode
  } else {
    setMode(prefersDark ? "dark" : "light");
  }


  toggleBtn.addEventListener("click", () => {
    const currentMode = body.dataset.theme;
    const newMode = currentMode === "dark" ? "light" : "dark";
    setMode(newMode);

    localStorage.setItem("theme", newMode);
  });


  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinksList = navLinks.querySelectorAll("a");
 //Nav Bar For Mobile
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");


    const isExpanded = navLinks.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isExpanded);
  });


  navLinksList.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", false);
      }
    });
  });

  const fadeElements = document.querySelectorAll(".fade-in"); //Animation

  const observerOptions = {
    root: null, 
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => {
    observer.observe(el);
  });
});