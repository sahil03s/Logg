import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <>
        <header className="flex container-fluid">
            <nav className="flex bolder">
                <img className="logo" src="/img/logo.png" alt="logo"/>
                <div className="flex items-center">
                    <ul className="flex none-list-style capitalize items-center spaceBetween">
                        <li><NavLink to="/" className="link">Home </NavLink></li>
                        <li><NavLink to="about" className="link"> About </NavLink></li>
                        <li><NavLink to="contact" className="link"> Contact </NavLink></li>
                        <li><NavLink to="compose" className="link right"> Compose </NavLink></li>
                    </ul>
                </div>
            </nav>
        </header>
        </>
    );
}