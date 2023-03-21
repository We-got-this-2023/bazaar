type Theme = "light" | "dark" | "system" | undefined;

function setTheme(theme?: Theme) {
  // If no theme is passed, get it from localStorage or default to "system"
  if (!theme) {
    const storedTheme = localStorage.getItem("theme") as Theme;
    if (!storedTheme) localStorage.setItem("theme", "system");
    theme = storedTheme || "system";
  }
  // If the theme is set to "system", set it to the user's system theme
  if (theme === "system") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Save the theme to localStorage
  localStorage.setItem("theme", theme);
  // Set the theme on the document for Tailwind to use
  document.documentElement.className = theme;
  return theme;
}

function toggleTheme() {
  const newTheme = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  setTheme(newTheme);
}

function initSettings() {
  // Set the theme on page load
  const theme = setTheme() as Theme;

  // Listen for changes to the user's system theme
  if (theme === "system") {
    window.matchMedia("(prefers-color-scheme: dark)").onchange = () =>
      setTheme("system");
  }
}

export { initSettings, toggleTheme, setTheme };
