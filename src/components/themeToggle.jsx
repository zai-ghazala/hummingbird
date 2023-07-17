import React, { useEffect } from "react";

export const ThemeToggle = () => {

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
  }, [document])

  const nextTheme = () => {

    const allThemes = ['parrot', 'tropical', 'beachy', 'peachy', 'bubblegum', 'electric']

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
