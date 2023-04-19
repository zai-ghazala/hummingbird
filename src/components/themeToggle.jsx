import React, { useEffect } from "react";

export const ThemeToggle = () => {

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "darkPalette");
      } else {
        document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "electricPalette");
      }
    }
    else { document
    .getElementsByTagName("HTML")[0]
    .setAttribute("data-theme", localStorage.getItem("theme"));
    }
  },[]);

  const nextTheme = () => {

    const allThemes = ['parrotPalette', 'tropicalPalette', 'beachyPalette', 'peachyPalette', 'northernLightsPalette', 'bubblegumPalette', 'magentaPalette', 'electricPalette', 'darkPalette']

    const theme = allThemes[parseInt(Math.random() * allThemes.length)];

    document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    }


  return (
      <button
      type="button"
      className="random theme"
      onClick={() => nextTheme()}
    >
      <span>⟳</span>
      random theme
    </button>
  );
}
