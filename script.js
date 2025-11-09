const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const THEME_KEY = "preferred-theme";

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  const body = document.body;
  body.classList.remove("theme-light", "theme-dark");
  body.classList.add(`theme-${theme}`);
  themeToggle.checked = theme === "dark";
  themeLabel.textContent = `${theme[0].toUpperCase()}${theme.slice(1)} theme`;
}

function loadInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return prefersDarkScheme.matches ? "dark" : "light";
}

const initialTheme = loadInitialTheme();
applyTheme(initialTheme);

themeToggle.addEventListener("change", () => {
  const theme = themeToggle.checked ? "dark" : "light";
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
});

prefersDarkScheme.addEventListener("change", (event) => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    return;
  }
  applyTheme(event.matches ? "dark" : "light");
});
