import styles from './loginForm.module.css';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { submitLogin } from './loginSubmit';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Must be at least 8 characters long"),
});

type loginData = z.infer<typeof loginSchema>;

interface LoginFormProps { onSignupClick: () => void; }

export default function LoginForm({ onSignupClick }: LoginFormProps) {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<loginData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: loginData) => {
        const result = await submitLogin(data.email, data.password);
        if (result.success) {
            console.log(`user logged in (${data.email})`)
            router.refresh();
        } else {
            console.error('login failed:', result.error)
        }
    };

    return (
        <>
            <h1 className={styles.modalFormTitle}>User Login</h1>
            <h2 className={styles.modalFormSubTitle}>Welcome back!</h2>
            <p className={styles.modalFormText}>Please enter your login details below.</p>
            <a className={styles.signUpLink} onClick={onSignupClick}>Or sign up instead.</a>
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.formLabel} htmlFor="Email">Email:</label>
                <input className={styles.emailInput} type="text" placeholder="Email" {...register("email")} />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                <label className={styles.formLabel} htmlFor="password">Password:</label>
                <input className={styles.passwordInput} type="password" placeholder="Password" {...register("password")} />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                <a className={styles.forgotPassLink} href="">Forgot password?</a>
                <button className={styles.loginSubmit} type="submit">Login</button>
            </form>
        </>
    )
}