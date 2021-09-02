import Random from "../components/random.jsx";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

export default function Home() {
  return (
    <>
      <div id="container">
        <img
          className="bird"
          src="https://cdn.glitch.com/ff50bc56-1555-4860-bbd4-f822f0922562%2Fhummingbird-right.png"
        />
        <DndProvider options={HTML5toTouch}>
          <Random />
        </DndProvider>
        <img
          className="bird"
          src="https://cdn.glitch.com/ff50bc56-1555-4860-bbd4-f822f0922562%2Fhummingbird-left.png"
        />
      </div>
    </>
  );
}
