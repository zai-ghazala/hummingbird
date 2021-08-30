import * as React from "react";
import { Link } from "wouter";
import { Random } from "../components/random.jsx";

export default function Home() {
  return (
    <>
      <div id="container">
        <img
          id="img-top-right"
          src="https://cdn.glitch.com/ff50bc56-1555-4860-bbd4-f822f0922562%2Fhummingbird-right.png"
        />
        <Random />
        <img
          id="img-bottom-left"
          src="https://cdn.glitch.com/ff50bc56-1555-4860-bbd4-f822f0922562%2Fhummingbird-left.png"
        />
      </div>
    </>
  );
}
