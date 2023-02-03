import {Link} from 'react-router-dom';
import styles from './Header.module.css';

import logo from '../resources/logo-site.png';

export function Header() {
    return(
        <header className={styles.header}>
            <Link to="/">
                <img src={logo} alt="Logotipo do site."/>
            </Link>
            <label className={styles.title}>Fácil Transparencia</label>
        </header>
    );
}