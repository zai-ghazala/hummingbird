import * as React from "react";
import { useDrag } from "react-dnd";

export const Box = () => {
    const [, drag] = useDrag(() => ({ type: 'draggable' }));
    return (<div ref={drag} style={style}>
			Drag me
		</div>);
};

export class Draggable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Drag />
        {this.props.poem.map((item, i) => (
          <div key={"block-" + i}>
            {item.lines.map((line, i) => (
              <div key={"line-" + i}>
                {line.split(" ").map((word, i) => (
                  <span ref={drag} className="word" key={"word-" + i}>
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
        ;
      </>
    );
  }
}
