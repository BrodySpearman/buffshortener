import modalStyles from '../../login/loginForm.module.css';
import styles from './verify.module.css';

export default function Verify() {
    return (
        <>
            <h1 className={modalStyles.modalFormTitle}>Verification</h1>
            <h2 className={modalStyles.modalFormSubTitle}>Thanks for signing up!</h2>
            <p className={`${modalStyles.modalFormText} ${styles.verifyText}`}>We sent a verification link to your email address.</p>

            <div className={styles.verifyForm}>
                <label className={modalStyles.formLabel} htmlFor="verifyCode">Need a new code?</label>
                <button className={styles.verifySubmit} type="submit">Send link again</button>
            </div>
        </>
    )
}