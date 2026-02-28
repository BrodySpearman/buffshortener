import styles from './login-btn.module.css'

export default function LoginBtn() {
    return (
        <div className={styles.loginBtnContainer}>
            <button className={styles.loginBtn}>Login or sign up now!</button>
        </div>
    )
}