import styles from './signupForm.module.css';
import modalStyles from '../login/loginForm.module.css';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { signupServerSubmit } from '../../../../actions/forms/signupSubmit';

const signupSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Must be at least 8 characters long"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type signupData = z.infer<typeof signupSchema>;

interface SignupFormProps {
    onLoginClick: () => void;
    onVerifyClick: () => void;
}

export default function SignupForm({ onLoginClick, onVerifyClick }: SignupFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<signupData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = (data: signupData) => {
        signupServerSubmit(data)
        onVerifyClick();
    };

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
            <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.email}>
                    <label className={modalStyles.formLabel} htmlFor="Email">Email:</label>
                    <input className={`${styles.emailInput} ${styles.formInput}`} type="text" placeholder="Email" {...register("email")} />
                    {errors.email && <p className={`${styles.signupErrorFormat} ${modalStyles.error}`}>{errors.email.message}</p>}
                </div>
                <div className={styles.password}>
                    <label className={modalStyles.formLabel} htmlFor="password">Password:</label>
                    <input className={`${styles.passwordInput} ${styles.formInput}`} type="password" placeholder="Password" {...register("password")} />
                    {errors.password && <p className={`${styles.signupErrorFormat} ${modalStyles.error}`}>{errors.password.message}</p>}
                </div>
                <div className={`${styles.password} ${styles.confirmPassword}`}>
                    <label className={modalStyles.formLabel} htmlFor="confirmPassword">Confirm Password:</label>
                    <input className={`${styles.passwordInput} ${styles.formInput}`} type="password" placeholder="Password" {...register("confirmPassword")} />
                    {errors.confirmPassword && <p className={`${styles.signupErrorFormat} ${modalStyles.error}`}>{errors.confirmPassword.message}</p>}
                </div>
                <button className={styles.signupSubmit} type="submit">Sign up.</button>
            </form>
        </>
    )
}