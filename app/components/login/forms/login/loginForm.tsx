import Form from "next/form";
import styles from './loginForm.module.css';

interface LoginFormProps { onSignupClick: () => void; }

export default function loginForm({ onSignupClick }: LoginFormProps) {
    return (
        <>
            <h1 className={styles.modalFormTitle}>User Login</h1>
            <h2 className={styles.modalFormSubTitle}>Welcome back!</h2>
            <p className={styles.modalFormText}>Please enter your login details below.</p>
            <a className={styles.signUpLink} onClick={onSignupClick}>Or sign up instead.</a>
            <Form className={styles.loginForm} action={''}>
                <label className={styles.formLabel} htmlFor="Email">Email:</label>
                <input className={styles.emailInput} type="text" name="Email" placeholder="Email" />
                <label className={styles.formLabel} htmlFor="password">Password:</label>
                <input className={styles.passwordInput} type="password" name="password" placeholder="Password" />
                <a className={styles.forgotPassLink} href="">Forgot password?</a>
                <button className={styles.loginSubmit} type="submit">Login</button>
            </Form>
        </>
    )
}