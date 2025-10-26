
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

  const savedTheme = localStorage.getItem("theme"); 

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme) {
    setMode(savedTheme);
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

  const fadeElements = document.querySelectorAll(".fade-in"); 

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
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); 
}

  function toggleChat() {
    const chat = document.getElementById("chatbot");
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
  }

  function sendMessage() {
    const input = document.getElementById("user-input");
    const messages = document.getElementById("chatbot-messages");
    const text = input.value.trim();

    if (text === "") return;


    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.innerText = text;
    messages.appendChild(userMsg);
    input.value = "";


    messages.scrollTop = messages.scrollHeight;

  
    setTimeout(()=>{
      let botMsg = document.createElement("div");
      botMsg.className = "bot-message";

      if (text.toLowerCase().includes("event")) {
        botMsg.innerText = "Our upcoming events are HackWave 3.0, DevFest 2025, and AI Bootcamp 🚀";
      } else if (text.toLowerCase().includes("contact")) {
        botMsg.innerText = "You can reach us at echelondevsociety@gmail.com 📧";
      } else if (text.toLowerCase().includes("hello") || text.toLowerCase().includes("hi")) {
        botMsg.innerText = "Hey there! 👋 How can I assist you today?";
      } else if(text.includes("1")){
         botMsg.innerText = "Our upcoming events are HackWave 3.0, DevFest 2025, and AI Bootcamp 🚀";
      }else if(text.includes("2")){
         botMsg.innerText = "You can reach us at echelondevsociety@gmail.com 📧";}
      else {
        botMsg.innerText = "I'm not sure about that 🤔 — but our team will update me soon!";
      }
       

      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 100);
  
  }
