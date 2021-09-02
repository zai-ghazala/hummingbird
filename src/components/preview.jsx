import { DndProvider, Preview } from 'react-dnd-multi-backend'

const generatePreview = () => {
  console.log('hello')
}

const App = () => {
  return (
    <DndProvider options={MyPipeline}>
      <Preview generator={generatePreview} />
    </DndProvider>
  )
}