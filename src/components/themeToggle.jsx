import React, { useEffect, useState } from "react";

export const ThemeToggle = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("default")) {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "default");
    } else {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
    }
  }, []);

  const nextTheme = () => {
    const allThemes = ['default', 'dark', 'accent']

    setCount(count + 1);

    localStorage.setItem("theme", allThemes[count % allThemes.length]);
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
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
