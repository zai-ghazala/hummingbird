import { DndProvider, Preview } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

import { Poem } from './poem.jsx'
import { Word } from './word.jsx'


const generatePreview = ({itemType, item, style}) => {
  <div style={{ backgroundColor: 'red' }}>Generated</div>
}

const App = () => {
  return (
    <DndProvider options={HTML5toTouch}>
      <Preview>{generatePreview}</Preview>
    </DndProvider>
  )
}