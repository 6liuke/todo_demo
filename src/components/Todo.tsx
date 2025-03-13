
import { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import axios from 'axios'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: string
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(() => dayjs())
  
  useEffect(() => {
    fetchTodos()
  }, [selectedDate])

  const fetchTodos = async () => {
    try {
      const params = selectedDate ? { date: selectedDate.format('YYYY-MM-DD') } : {}
      const response = await axios.get('http://localhost:5000/api/todos', { params })
      setTodos(response.data)
    } catch (error) {
      console.error('获取Todo列表失败:', error)
    }
  }

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:5000/api/todos', {
          text: input.trim(),
          completed: false
        })
        setTodos([response.data, ...todos])
        setInput('')
      } catch (error) {
        console.error('添加Todo失败:', error)
      }
    }
  }

  const handleToggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id)
      if (!todo) return

      const response = await axios.patch(`http://localhost:5000/api/todos/${id}`, {
        completed: !todo.completed
      })
      setTodos(todos.map(t => t.id === id ? response.data : t))
    }
   catch (error) {
    console.error('更新Todo状态失败:', error)
  }
}
  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('删除Todo失败:', error)
    }
  }

  return (
    <div className="app-container">
      <h1>Todo 列表</h1>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
          {selectedDate?.format('YYYY-MM-DD')}
        </div>
        <div style={{ marginTop: '0.5rem', color: '#666', fontSize: '14px' }}>
          当前日期：{selectedDate?.format('YYYY年MM月DD日')}
        </div>
      </div>
      <DatePicker
        onChange={(date) => setSelectedDate(date)}
        value={selectedDate}
        style={{ marginBottom: '1rem' }}
      />
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="添加新任务..."
        />
        <button type="submit">添加</button>
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
