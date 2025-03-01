import LoginNavButton from "./LoginNavButton";

import "../styles/navBar.css";

const Navbar = () => {
    return (
        <header>
            <nav className="navbar">
                <a href="/">
                    <img src="/manicon.png" alt="navbar-icon" id="navbar-img" />
                </a>
                <LoginNavButton />
            </nav>
        </header>
    );
};

export default Navbar;
