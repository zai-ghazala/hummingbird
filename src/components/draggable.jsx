import * as React from "react";
import { useDrag } from 'react-dnd';

export class Draggable extends React.Component {
    const [, drag] = useDrag(() => ({ type: 'draggable'}));
    return ({this.props.poem.map((item, i) => (
          <div key={"block-" + i}>
            {item.lines.map((line, i) => (
              <div key={"line-" + i}>
                {line.split(" ").map((word, i) => (
                  <span className="word" key={"word-" + i}>
                    {word}
                  </span>
                ))}
              </div>
            ))});
};
