import * as React from "react";
import { useDrag } from 'react-dnd';

export default () => {
    
    const [, drag] = useDrag(() => ({ type: 'draggable'}));
    return (
        <AllowanceClass classes={classes} />
    )
}

export class Draggable extends React.Component {
constructor(props) {
    super();
};
  
  
  render(){
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
  )  }
