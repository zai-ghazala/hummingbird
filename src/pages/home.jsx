import * as React from "react";
import Random from "../components/random.jsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import {
  DndProvider,
  TouchTransition,
  MouseTransition,
  createTransition
} from "react-dnd-multi-backend";

const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition
    }
  ]
};

export Home = () => {
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
