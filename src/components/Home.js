import Record from './Record';

const Home = ({ records, assignees }) => {
    return (
        <div>
            {records.map((record) => (
                <Record key={record.id} record={record} assignees={assignees} />
            ))}
        </div>
    )
}

export default Home
