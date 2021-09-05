import React from "react";

export const Space = () => {
  return <div><DropTarget 
    targetKey="foo" 
    dropData={some object} 
    onHit={some function}
    onDragEnter={some function} 
    onDragLeave={some function} 
>
    <p>Drop something on me</p>
</DropTarget></div>;
};