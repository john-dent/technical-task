import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Edit from './components/Edit';
import Settings from './components/Settings';

function App() {
  const [records, setRecords] = useState([])
  const [assignees, setAssignees] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getRecords = async () => {
      const recordsFromServer = await fetchRecords()
      setRecords(recordsFromServer)
    }

    const getAssignees = async () => {
      const assigneesFromServer = await fetchAssignees()
      setAssignees(assigneesFromServer)
    }

    const getCategories = async () => {
      const categoriesFromServer = await fetchCategories()
      setCategories(categoriesFromServer)
    }

    getCategories()
    getAssignees()
    getRecords()
  }, [])

  // Fetch Records
  const fetchRecords = async () => {
    const res = await fetch('http://localhost:5000/records?_embed=recordsWithAssignees&_expand=category')
    const data = await res.json()

    return data
  }

  //Reload records
  const reloadRecords = async () => {
    const recordsFromServer = await fetchRecords()
    setRecords(recordsFromServer)
  }

  // Fetch Assignees
  const fetchAssignees = async () => {
    const res = await fetch('http://localhost:5000/assignees')
    const data = await res.json()

    return data
  }
  
  // Fetch Categories
  const fetchCategories = async () => {
    const res = await fetch('http://localhost:5000/categories')
    const data = await res.json()

    return data
  }

  //Reload Settings
  const reloadSettings = async () => {
      const assigneesFromServer = await fetchAssignees()
      setAssignees(assigneesFromServer)

      const categoriesFromServer = await fetchCategories()
      setCategories(categoriesFromServer)
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Route path='/' exact component={() => <Home assignees={assignees} records={records} />} />
          <Route path='/:id/edit' exact component={() => <Edit assignees={assignees} categories={categories} getRecords={reloadRecords} />} />
          <Route path='/settings' component={() => <Settings assignees={assignees} categories={categories} getSettings={reloadSettings} />} />
        </div>
      </div>
    </Router>
  );
}

export default App;
