import { Link } from 'react-router-dom'
import { FaCogs } from 'react-icons/fa'

const Header = () => {
    return (
        <header className="App-header">
            <Link to={'/'} className="header-link">Tasks</Link>
            <span className="settings-link"><Link to={'/settings'} className="header-link"><FaCogs /></Link></span>
        </header>
    )
}

export default Header
