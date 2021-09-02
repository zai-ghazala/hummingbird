import { useDrag } from "react-dnd";

export const Word = props => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "word",
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
      <span className="word" ref={dragRef}>{props.word}</span>
  );
};
