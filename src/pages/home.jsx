import * as React from "react";
import Random from "../components/random";

import { ThemeToggle } from "../components/themeToggle.jsx";

export default function Home() {
  return (
      <div id="container">
        <img
          className="bird bird--right"
          src="/hummingbird-right.png"
          alt="hummingbird"
        />

        <Random />

        <img
          className="bird bird--left"
          src="/hummingbird-left.png"
          alt="hummingbird"
        />

        
        <ThemeToggle />
        <div className="footer">made with 💖 by <a href="https://suddenghazals.com">Zainab Ismail</a></div>
      </div>
  );
}
