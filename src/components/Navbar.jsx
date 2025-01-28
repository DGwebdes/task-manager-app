import LoginNavButton from './LoginNavButton';

import '../styles/navBar.css'

const Navbar = () => {
    return (
        <header>
            <nav className="navbar">
                <a href="/task-manager-app">
                    <h1>Dielan&apos;s Task Manager</h1>
                </a>
                <LoginNavButton />
            </nav>
        </header>
    )
}

export default Navbar;