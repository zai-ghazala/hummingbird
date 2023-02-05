import React, { useEffect, useState } from "react";

export const ThemeToggle = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "darkPalette");
      } else {
        document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "peachyPalette");
      }
    }
    else { document
    .getElementsByTagName("HTML")[0]
    .setAttribute("data-theme", localStorage.getItem("theme"));
    }
  },[]);

  const nextTheme = () => {
    const allThemes = ['lilacPalette', 'beachyPalette', 'parrotPalette', 'plainPalette', 'contrastPalette', 'peachyPalette', 'northernLightsPalette', 'yellowPalette']

    setCount(count + 1);

    const theme = allThemes[count % allThemes.length];

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
      <br />
      random palette
    </button>
  );
}
