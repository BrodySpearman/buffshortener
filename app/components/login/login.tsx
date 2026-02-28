'use client';
import styles from './login.module.css';
import { useState } from 'react';
import Form from 'next/form'

export default function Login() {
    const [isModal, setModalOpen] = useState(false);

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
                            <h1 className={styles.modalFormTitle}>User Login</h1>
                            <h2 className={styles.modalFormSubTitle}>Welcome back!</h2>
                            <p className={styles.modalFormText}>Please enter your login details below.</p>
                            <a className={styles.signUpLink} href="">Or sign up instead.</a>
                            <Form className={styles.loginForm} action={''}>
                                <label className={styles.formLabel} htmlFor="Email">Email:</label>
                                <input className={styles.emailInput} type="text" name="Email" placeholder="Email" />
                                <label className={styles.formLabel} htmlFor="password">Password:</label>
                                <input className={styles.passwordInput} type="password" name="password" placeholder="Password" />
                                <a className={styles.forgotPassLink} href="">Forgot password?</a>
                                <button className={styles.loginSubmit} type="submit">Login</button>
                            </Form>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}