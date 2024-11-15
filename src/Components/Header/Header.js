import redditLogo from '../../images/redditLogo.png';
import React from 'react';
import styles from './Header.module.css';


 const Header = () => {

    return (
        <div className={styles.container}>
            <img src={redditLogo} alt='reddit logo' className={styles.photo}/>
            <h1 className={styles.text}>Reddit App</h1>
        </div>
        
    );
};

export default Header;