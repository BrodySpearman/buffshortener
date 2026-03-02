'use client';
import styles from './login.module.css';
import { useState } from 'react';
import LoginForm from './forms/login/loginForm';
import SignupForm from './forms/signup/signupForm';

export default function Login() {
    const [isModal, setModalOpen] = useState(false);
    const [formState, setFormState] = useState('login');

    const switchFormToSignup = () => {
        setFormState('signup')
    }

    const switchFormToLogin = () => {
        setFormState('login')
    }

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div>
            <div className={styles.loginBtnContainer}>
                <button className={styles.loginBtn} onClick={openModal}>Login or sign up now!</button>
            </div>

            {isModal &&
                <div className={styles.modalContainer}>
                    <div className={styles.modalBody}>
                        <button className={styles.closeModalBtn} onClick={closeModal}>X</button>
                        <div className={styles.modalFormBody}>
                            {formState === 'login' ? (
                                <LoginForm onSignupClick={switchFormToSignup} />
                            ) : (
                                <SignupForm onLoginClick={switchFormToLogin} />
                            )}
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}