import React, { useEffect, useState } from "react";
import useLocalStorage from 'use-local-storage'

export const ThemeToggle = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
        document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "defaultPalette");
    }
    else {
        document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
        localStorage.setItem("theme", "defaultPalette");
    }
  },[]);

  const nextTheme = () => {
    const allThemes = ['defaultPalette', 'darkPalette', 'nudePalette', 'turquoisePalette', 'serenePalette']

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
      random theme!
    </button>
  );
}
