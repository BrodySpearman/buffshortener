import styles from './url-list.module.css';

export default async function URLList() {

    const url: { inputUrl: string | null, shortUrl: string | null }[] = await fetchUrlList();

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
                        {url && url.map((url, index) => (
                            <tr key={index} className={styles.tableRow}>
                                <td><a href={url.inputUrl || ''} target="_blank" rel="noopener noreferrer">{url.inputUrl || ''}</a></td>
                                <td><a href={url.shortUrl || ''} target="_blank" rel="noopener noreferrer">{url.shortUrl || ''}</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

async function fetchUrlList() {
    let baseUrl = 'https://buffshortener.vercel.app';
    if (process.env.NODE_ENV === 'development') {
        baseUrl = 'http://localhost:8000';
    }

    try {
        const response = await fetch(
            `${baseUrl}/api/show-url-list`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch URL list");
        }
        const urlList = await response.json();
        console.log(urlList);
        return urlList;

    } catch (error) {
        console.error(error);
        return null;
    }
}
