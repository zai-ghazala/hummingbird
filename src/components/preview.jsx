import { DndProvider, Preview } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

const generatePreview = ({itemType, item, style}) => {
  // render your preview
}

const App = () => {
  return (
    <DndProvider options={HTML5toTouch}>
      <Preview generator={generatePreview} />
      {/* or */}
      <Preview>{generatePreview}</Preview>
    </DndProvider>
  )
}