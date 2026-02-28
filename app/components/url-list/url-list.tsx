import styles from './url-list.module.css';
import { refresh } from 'next/cache';
import { cookies } from 'next/headers';

let baseUrl = 'https://buffshortener.vercel.app';
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8000';
}

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
                    <colgroup>
                        <col style={{ width: '75%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '5%' }} />
                    </colgroup>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th>Input URL</th>
                            <th>Short URL</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {url && url.map((url, index) => (
                            <tr key={index} className={styles.tableRow}>
                                <td className={styles.inputCell}><a href={url.inputUrl || ''} target="_blank" rel="noopener noreferrer">{url.inputUrl || ''}</a></td>
                                <td className={styles.shortCell}><a href={`${baseUrl}/${url.shortUrl}` || ''} target="_blank" rel="noopener noreferrer">{url.shortUrl || ''}</a></td>
                                <td className={styles.deleteCell}>
                                    <form action={deleteUrl}>
                                        <button className={styles.deleteButton} name="shortUrl" value={url.shortUrl || ''} type="submit"> - </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

async function fetchUrlList() {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get('session_id')?.value;

        const response = await fetch(`${baseUrl}/api/show-url-list`, {
            headers: {
                'Cookie': `session_id=${sessionId}`
            }
        });
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

async function deleteUrl(formData: FormData) {
    'use server';

    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get('session_id')?.value;

        const response = await fetch(
            `${baseUrl}/api/delete-url`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `session_id=${sessionId}`
                },
                body: JSON.stringify({ shortUrl: formData.get('shortUrl') }),
            }
        );
        if (!response.ok) {
            throw new Error("Failed to delete URL");
        }
        const result = await response.json();
        console.log(result);
        refresh();
        return result;

    } catch (error) {
        console.error(error);
        return null;
    }
}

