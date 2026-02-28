import styles from './header.module.css';
import LoginBtn from '../login/login-btn/login-btn';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoTitle}>
                    <h1>B.U.F.F.</h1>
                </div>
                <div className={styles.logoSubtitle}>
                    <p className={styles.logoSubtitleText}>A simple, lightweight URL shortener</p>
                </div>
            </div>
            <LoginBtn />
        </header>
    );
}