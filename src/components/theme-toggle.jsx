import React, {useState, useEffect} from 'react';

export const ThemeToggle = () => {
const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
        document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "light");
    }
    else {
        document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
    }
  },[]);

  const toggleThemeChange = () => {
    if (isDark === false) {
      localStorage.setItem("theme", "dark");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
        setIsDark(true);
    } else {
      localStorage.setItem("theme", "light");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
        setIsDark(false);
    }
  }

  return (
    <>   

      
      <input type="checkbox" id="checkbox" defaultChecked={isDark}
        onChange={() => toggleThemeChange()} />

      </>
  )
}
