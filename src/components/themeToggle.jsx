import React, { useEffect, useState } from "react";

export const ThemeToggle = () => {
  
  const [theme, setTheme] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      document
        .getElementsByTagName('HTML')[0]
        .setAttribute('data-theme', 'electric');
    } else {
      document
        .getElementsByTagName('HTML')[0]
        .setAttribute('data-theme', localStorage.getItem('theme'));
    }
  }, [theme])

  const nextTheme = () => {

    const allThemes = ['parrot', 'tropical', 'beachy', 'peachy', 'bubblegum', 'electric']

    const theme = allThemes[parseInt(Math.random() * allThemes.length)];

    document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    setTheme(theme)
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
