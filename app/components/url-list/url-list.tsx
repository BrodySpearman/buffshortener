import styles from './url-list.module.css';

export default async function URLList() {

    const url: { inputUrl: string | null, shortUrl: string | null } = await fetchUrlList();

    if (!url) {
        return (
            <div className={styles.urlListOuter}>
                <h1 className={styles.urlListTitle}>URL List</h1>
                <div className={styles.urlListInner}>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.urlListOuter}>
            <h1 className={styles.urlListTitle}>URL List</h1>
            <div className={styles.urlListInner}>
                <table className={styles.urlTable}>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th>Input URL</th>
                            <th>Short URL</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        <tr className={styles.tableRow}>
                            <td>{url.inputUrl}</td>
                            <td>{url.shortUrl}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

async function fetchUrlList() {
    const baseUrl = 'http://localhost:3000/';
    try {
        const response = await fetch(
            `${baseUrl}/api/py/show-url-list`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const url = await response.json();
        console.log(url);
        return url;

    } catch (error) {
        console.error("Error fetching url list:", error);
        return null;
    }
}
