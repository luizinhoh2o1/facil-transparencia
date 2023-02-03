import React from "react";
import {Link} from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
    return(
        <div className={styles.navBar}>
            <Link to="/portaria" className={styles.buttons}>Portaria</Link>
        </div>
    );
}

export default Home;