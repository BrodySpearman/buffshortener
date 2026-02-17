import styles from './url-input.module.css';

export default function URLInput() {
    return (
        <div className={styles.urlInputContainer}>
            <form className={styles.urlInputForm}>
                <input className={styles.urlInput} type="text" placeholder="Enter or paste link to anything" />
                <button className={styles.urlInputButton} type="submit">Shorten URL</button>
            </form>
        </div>
    );
}