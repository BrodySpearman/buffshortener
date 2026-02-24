import { headers } from 'next/headers';
import styles from './url-input.module.css';
import Form from 'next/form';
import { refresh } from 'next/cache';

export default function URLInput() {

    return (
        <div className={styles.urlInputContainer}>
            <Form className={styles.urlInputForm} action={submitVal}>
                <input className={styles.urlInput} name="inputUrl" placeholder="Enter or paste link to anything" />
                <button className={styles.urlInputButton} type="submit">Shorten URL</button>
            </Form>
        </div>
    );
}

async function submitVal(formData: FormData) {

    let baseUrl = 'https://buffshortener.vercel.app';
    if (process.env.NODE_ENV === 'development') {
        baseUrl = 'http://localhost:3000';
    }

    const response = await fetch(`${baseUrl}/api/py/submit-url`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputUrl: formData.get('inputUrl') }),
    });

    if (!response.ok) {
        throw new Error("Failed to send data");
    }

    const data = await response.json();
    console.log(data);
    refresh();
}