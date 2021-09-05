import React from "react";
import { DropTarget } from 'react-drag-drop-container';
    
export const Space = (props) => {
  
   dropped(ev){
  
  }
    
  return <DropTarget 
    targetKey="drag"
    onDrop={this.dropped}><div></div>
</DropTarget>;
};