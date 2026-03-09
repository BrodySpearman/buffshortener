'use client';
import styles from './login.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import LoginForm from './forms/login/loginForm';
import SignupForm from './forms/signup/signupForm';
import VerifyForm from './forms/verify/signupVerify/verify';

export default function Login() {
    const [isModal, setModalOpen] = useState(false);
    const [formState, setFormState] = useState('login');

    // url param method to redirect to login after user verification
    // Probably not the way of doing it but it works.
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const showLoginParam = searchParams.get('showLogin');
        const paramsObject = new URLSearchParams(searchParams);

        if (showLoginParam == 'true') {
            setModalOpen(true);
            setFormState('login');
            paramsObject.delete('showLogin');
            router.replace(`/?${paramsObject.toString()}`);
        }
    }, [searchParams]);

    const switchFormToSignup = () => {
        setFormState('signup');
    }
    const switchFormToLogin = () => {
        setFormState('login');
    }
    const switchFormToVerify = () => {
        setFormState('verify');
    }

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
        setFormState('login');
    }

    return (
        <div>
            <div className={styles.loginBtnContainer}>
                <button className={`no-highlight ${styles.loginBtn}`} onClick={openModal}>Login or sign up now!</button>
            </div>

            {isModal &&
                <div className={styles.modalContainer}>
                    <div className={styles.modalBody}>
                        <button className={`${styles.closeModalBtn}`} onClick={closeModal}>X</button>
                        <div className={styles.modalFormBody}>
                            {formState === 'login' ? (
                                <LoginForm onSignupClick={switchFormToSignup} />
                            ) : formState === 'signup' ? (
                                <SignupForm onLoginClick={switchFormToLogin} onVerifyClick={switchFormToVerify} />
                            ) : formState === 'verify' && (
                                <VerifyForm />
                            )}
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}