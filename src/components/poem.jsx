import React from "react";
import Word from "./word.jsx";

export const Poem = props => {
  const { words } = props.poem.lines.split(" ");

  return (
    <>
      <div>
        {words.length > 0 &&
          words.map((word, i => <Word key={"word" + i} word={word} />))}
      </div>
    </>
  );
};
