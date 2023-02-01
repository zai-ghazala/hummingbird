import React, { useEffect, useState } from "react";
import useLocalStorage from 'use-local-storage'

export const ThemeToggle = () => {

  const [count, setCount] = useState(0);
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'defaultPalette');


  useEffect(() => {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", theme);
  
  });
  
  const nextTheme = () => {
    const allThemes = ['defaultPalette', 'darkPalette', 'nudePalette', 'turquoisePalette', 'serenePalette']

    setCount(count + 1);
    setTheme(allThemes[count % allThemes.length]);
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
