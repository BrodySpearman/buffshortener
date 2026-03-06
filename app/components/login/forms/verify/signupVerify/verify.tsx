import modalStyles from '../../login/loginForm.module.css';
import styles from './verify.module.css';

export default function Verify() {
    return (
        <>
            <h1 className={modalStyles.modalFormTitle}>Verification</h1>
            <h2 className={modalStyles.modalFormSubTitle}>Thanks for signing up!</h2>
            <p className={`${modalStyles.modalFormText} ${styles.verifyText}`}>We sent a verification code to your email address.</p>
            <form className={styles.verifyForm}>
                <label className={modalStyles.formLabel} htmlFor="verifyCode">Enter the code here:</label>
                <input className={styles.verifyInput} type="text" placeholder="Verification Code" />
                <button className={styles.verifySubmit} type="submit">Verify</button>
            </form>
        </>
    )
}