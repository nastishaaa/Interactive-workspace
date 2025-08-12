import { Link, NavLink } from "react-router-dom";
import s from './Header.module.css'

export default function Header() {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <Link to="/" className={s.logo}>
                    MyApp
                </Link>
                <nav className={s.nav}>
                    <NavLink to="/" end>
                        Home
                    </NavLink>
                    <NavLink to="/interactive-workspace">
                        Interactive Workspace
                    </NavLink>
                    <NavLink to="/bitcoin-transactions">
                        Bitcoin Transactions
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
