import * as React from "react";
import { DropTarget } from "react-drag-drop-container";

export class Drop extends React.Component {
  render() {
    return (
      <DropTarget targetKey="foo">
        <div id="droptarget"></div>
      </DropTarget>
    );
  }
}
