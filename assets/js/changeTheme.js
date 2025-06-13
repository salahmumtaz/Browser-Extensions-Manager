let ChangeThemeBtn = document.querySelector(".ChangeThemeBtn");
let body = document.body;

// ID for the dark theme link element
const darkThemeLinkId = "dark-theme";

// Set default theme if none in localStorage
if (!localStorage.getItem("Theme")) {
  localStorage.setItem("Theme", "light");
}

// Apply the stored theme on page load
applyTheme(localStorage.getItem("Theme"));

function applyTheme(theme) {
  if (theme === "light") {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    removeDarkThemeCss();
    ChangeImages(theme);
  } else if (theme === "dark") {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    addDarkThemeCss();
    ChangeImages(theme);
  }
}

function addDarkThemeCss() {
  // Check if dark theme link already exists
  if (!document.getElementById(darkThemeLinkId)) {
    const link = document.createElement("link");
    link.id = darkThemeLinkId;
    link.rel = "stylesheet";
    link.href = "assets/css/dark-theme-style.css"; // Adjust path if needed
    document.head.appendChild(link);
  }
}

function removeDarkThemeCss() {
  const existingLink = document.getElementById(darkThemeLinkId);
  if (existingLink) {
    existingLink.remove();
  }
}

function ChangeImages(theme) {
  const Logo = document.querySelector(".logo-container img");
  const themeIcon = ChangeThemeBtn.querySelector("img");

  if (theme === "light") {
    Logo.src = "/assets/images/logo.svg";
    themeIcon.src = "/assets/images/icon-moon.svg";
  } else {
    Logo.src = "/assets/images/logo-dark.svg";
    themeIcon.src = "/assets/images/icon-sun.svg";
  }
}

ChangeThemeBtn.addEventListener("click", () => {
  const currentTheme = body.classList.contains("light-theme")
    ? "dark"
    : "light";
  applyTheme(currentTheme);
  localStorage.setItem("Theme", currentTheme);
});
