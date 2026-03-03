import styles from './header.module.css';
import Login from '../login/login';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoTitle}>
                    <h1 className='no-highlight'>B.U.F.F.</h1>
                </div>
                <div className={styles.logoSubtitle}>
                    <p className={`no-highlight ${styles.logoSubtitleText}`}>A simple, lightweight URL shortener</p>
                </div>
            </div>
            <Login />
        </header>
    );
}