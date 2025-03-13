import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/Layout'
import TodoList from './components/Todo'
import Home from './components/Home'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="todo" element={<TodoList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
