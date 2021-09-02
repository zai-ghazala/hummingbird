import * as React from "react";
import Random from "../components/random.jsx";

export default function Home() {
  return (
      <div id="container">
        <img
          className="bird bird--right"
          src="https://cdn.glitch.com/ff50bc56-1555-4860-bbd4-f822f0922562%2Fhummingbird-right.png"
        />
        <Random />
        <img
          className="bird bird--left"
          src="https://cdn.glitch.com/ff50bc56-1555-4860-bbd4-f822f0922562%2Fhummingbird-left.png"
        />
      </div>
  );
}
