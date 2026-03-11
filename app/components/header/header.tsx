import styles from './header.module.css';
import Login from '../login/login';

interface HeaderProps {
    user: any;
}

export default function Header({ user }: HeaderProps) {
    return (
        <header className={`no-highlight ${styles.header}`}>
            <div className={styles.headerContent}>
                <div className={styles.logoTitle}>
                    <h1>B.U.F.F.</h1>
                </div>
                <div className={styles.logoSubtitle}>
                    <p className={styles.logoSubtitleText}>A simple, lightweight URL shortener</p>
                </div>
            </div>
            <Login user={user} />
        </header>
    );
}