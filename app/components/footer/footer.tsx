import styles from './footer.module.css';

interface FooterProps {
    user: any;
}

export default function Footer({ user }: FooterProps) {
    return (
        <div className={styles.footer}>
            <p>Created by Brody Spearman</p>
            {user && <p>Logged in as {user.email}</p>}
        </div>
    );
}