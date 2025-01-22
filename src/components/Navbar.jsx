import LoginNavButton from './LoginNavButton';
import '../styles/navBar.css'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h1>Dielan&apos;s Task Manager</h1>
            <LoginNavButton />
        </nav>
    )
}

export default Navbar;