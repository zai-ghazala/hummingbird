import * as React from "react";
import Random from "../components/random";
export default function Home() {
  return (
    <>
      <div id="container">
        <img
          className="bird bird--right"
          src="/assets/hummingbird-right.png"
          alt="hummingbird"
        />

        <Random />

        <img
          className="bird bird--left"
          src="/assets/hummingbird-left.png"
          alt="hummingbird"
        />

        <div className="footer">made with 💖 by <a href="https://zaiz.ai">Zainab Ismail</a></div>
      </div>
    </>
  );
}
