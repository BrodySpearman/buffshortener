import styles from './footer.module.css';
import { logout } from '../../actions/session/logout';

interface FooterProps {
    user: any;
}

export default function Footer({ user }: FooterProps) {
    return (
        <div className={styles.footer}>
            <p className={`no-highlight ${styles.creatorSig}`}>Created by Brody Spearman</p>
            {user && <p className={`no-highlight ${styles.accountInfo}`}>Logged in ({user.email})</p>}
            {user &&
                <form action={logout}>
                    <button className={`no-highlight ${styles.logoff}`} type="submit">(Logout)</button>
                </form>
            }
        </div>
    );
}