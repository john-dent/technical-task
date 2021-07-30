import { FaPencilAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Record = ({ record, assignees }) => {
    const assigned = record.recordsWithAssignees.map((assignee) => (
        assignee.assigneeId ? assignees.find(el => el.id === assignee.assigneeId).name : ''
    )).join(' | ')

    return (
        <div className="record">
            <h1>{record.title}</h1>
            <p>{record.description}</p>
            <p>
                <small>
                    Category: {record.category.name}<br />
                    {assigned.length ? 'Assignees: ' + assigned : 'No assignees'}
                </small>
            </p>
            <Link to={`/${record.id}/edit`} className="btn"><FaPencilAlt /> Edit</Link>
        </div>
    )
}

export default Record
