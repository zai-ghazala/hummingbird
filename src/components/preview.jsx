import { DndProvider, Preview } from 'react-dnd-multi-backend'
import {HTML5toTouch } from "rdndmb-html5-to-touch";

const generatePreview = () => {
  console.log('hello')
}

const App = () => {
  return (
    <DndProvider options={HTML5toTouch}>
      <Preview generator={generatePreview} />
    </DndProvider>
  )
}