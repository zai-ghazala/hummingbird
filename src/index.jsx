import React from "react";
import ReactDOM from "react-dom";
import App from "./app.jsx";
import { HelmetProvider } from "react-helmet-async";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
/**
 * Root of react site
 *
 * Imports Helment provider for the page head
 * And App which defines the content and navigation
 */

// Render the site https://reactjs.org/docs/react-dom.html#render
ReactDOM.render(
  <HelmetProvider>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </HelmetProvider>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
  import.meta.hot.accept();
}
