import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Edit = ({ assignees, categories, getRecords }) => {
    const id = useParams().id
    const [title, setTitle] = useState('')
    const [desc, setDescription] = useState('')
    const [recordAssignees, setAssignees] = useState([])
    const [recordCategory, setCategory] = useState('')

    useEffect(() => {
        if (id !== undefined) {
            const getRecord = async () => {
                const recordFromServer = await fetchRecord(id)
                setTitle(recordFromServer.title)
                setDescription(recordFromServer.description)
                const assigned = recordFromServer.recordsWithAssignees.map((assignee) => (
                    assignee.assigneeId
                ))
                setAssignees(Array.from(assigned))
                setCategory(recordFromServer.categoryId)
            }
            getRecord()
        }
    }, [id])

    // Fetch Record
    const fetchRecord = async (id) => {
        const res = await fetch(`http://localhost:5000/records/${id}?_embed=recordsWithAssignees&_expand=category`)
        const data = await res.json()

        return data
    }

    // Update Record
    const updateRecord = async (id) => {
        const updatedRecord = {
            title: title,
            description: desc,
            categoryId: recordCategory
        }
        const res = await fetch(`http://localhost:5000/records/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedRecord),
        })

        const data = await res.json()
        updateAssignees(id)
        getRecords()
        setTitle(data.title)
        setDescription(data.description)
        setCategory(data.categoryId)
    }

    const updateAssignees = async (id) => {
        const oldAssignees = await fetch(`http://localhost:5000/recordsWithAssignees?recordId=${id}`)

        const data = await oldAssignees.json()

        data.forEach((old) => (
            fetch(`http://localhost:5000/recordsWithAssignees/${old.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }
            })
        ))

        let updatedAssignees = []
        recordAssignees.map((assignee) => (
            updatedAssignees.push({
                assigneeId: parseInt(assignee),
                recordId: parseInt(id)
            })
        ))

        updatedAssignees.forEach((updatedAssignee) => (
            fetch(`http://localhost:5000/recordsWithAssignees/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(updatedAssignee),
            })
        ))
    }

    // On form submit
    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!title | !desc) {
          alert('Please complete all fields.')
          return
        }
    
        updateRecord(id)
      }

    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Title</label>
                    <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className='form-control'>
                    <label>Description</label>
                    <textarea placeholder='Description' rows="6" value={desc} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className="form-control">
                    <label>Assignees</label>
                    <select multiple={true} value={recordAssignees} onChange={(e) => setAssignees(Array.from(e.target.selectedOptions, option => option.value))} >
                        {assignees.map((assignee) => (
                            <option key={assignee.id} value={assignee.id}>{assignee.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className="form-control">
                    <label>Category</label>
                    <select value={recordCategory} onChange={(e) => setCategory(e.target.value)} >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <input type='submit' value='Save' className='btn' />
            </form>
        </div>
    )
}

export default Edit
