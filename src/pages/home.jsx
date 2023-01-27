import * as React from "react";
import Random from "../components/random";
import right from "../assets/hummingbird--right.png";
import left from "../assets/hummingbird--left.png";

export default function Home() {
  return (
    <>
      <div id="container">
        <img
          className="bird bird--right"
          src={right}
        />

        <Random />

        <img
          className="bird bird--left"
          src={left}
        />

        <div className="footer">made with 💖 by <a href="https://zaiz.ai">Zainab Ismail</a></div>
      </div>
    </>
  );
}
