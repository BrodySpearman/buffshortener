import Form from "next/form";
import styles from './signupForm.module.css';
import modalStyles from '../login/loginForm.module.css';

interface SignupFormProps {
    onLoginClick: () => void;
}

export default function signupForm({ onLoginClick }: SignupFormProps) {
    return (
        <>
            <h1 className={`${modalStyles.modalFormTitle}`}>User Signup</h1>
            <h2 className={`${modalStyles.modalFormSubTitle} ${styles.signupSubTitle}`}>Big. Url. Functional. Formatting.</h2>
            <p className={styles.signupText}>Sign up now to access:</p>
            <ul className={styles.featureList}>
                <li><p className={styles.listText}>Custom URLs</p></li>
                <li><p className={styles.listText}>URL history</p></li>
                <li><p className={styles.listText}>URL statistics</p></li>
            </ul>
            <p className={`${styles.signupText} ${styles.featureText}`}>With more features being worked on every week.</p>
            <a className={`${modalStyles.signUpLink} ${styles.loginLink}`} onClick={onLoginClick}>Login instead?</a>
            <Form className={styles.signupForm} action="">
                <div className={styles.email}>
                    <label className={modalStyles.formLabel} htmlFor="Email">Email:</label>
                    <input className={`${styles.emailInput} ${styles.formInput}`} type="text" name="Email" placeholder="Email" />
                </div>
                <div className={styles.password}>
                    <label className={modalStyles.formLabel} htmlFor="password">Password:</label>
                    <input className={`${styles.passwordInput} ${styles.formInput}`} type="password" name="password" placeholder="Password" />
                </div>
                <div className={`${styles.password} ${styles.confirmPassword}`}>
                    <label className={modalStyles.formLabel} htmlFor="confirmPassword">Confirm Password:</label>
                    <input className={`${styles.passwordInput} ${styles.formInput}`} type="password" name="confirmPassword" placeholder="Password" />
                </div>
                <button className={styles.signupSubmit} type="submit">Sign up.</button>
            </Form>
        </>
    )
}