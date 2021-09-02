import * as React from "react";
import Random from "../components/random.jsx";
import { DndProvider } from 'react-dnd';

import {HTML5toTouch } from "rdndmb-html5-to-touch";

export default function Home() {
  return (
    <div id="container">
      <img
        className="bird bird--right"
        src="https://cdn.glitch.com/ff50bc56-1555-4860-bbd4-f822f0922562%2Fhummingbird-right.png"
      />

      <DndProvider options={HTML5toTouch}>
        <Random />
      </DndProvider>
      <img
        className="bird bird--left"
        src="https://cdn.glitch.com/ff50bc56-1555-4860-bbd4-f822f0922562%2Fhummingbird-left.png"
      />
    </div>
  );
}
