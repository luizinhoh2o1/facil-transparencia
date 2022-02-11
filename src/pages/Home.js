import React from "react";
import {Link} from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
    return(
        <div className={styles}>
            <div className={styles.navBar}>
                <Link to="/portaria">Portaria</Link>
            </div>
        </div>
    );
}

export default Home;