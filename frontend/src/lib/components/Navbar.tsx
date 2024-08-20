export function Navbar() {
    return (
        <nav className="fixed-top bg-light navbar navbar-expand-lg border-bottom">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/produtor">Produtor</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}