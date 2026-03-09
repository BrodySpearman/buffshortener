'use client'
import styles from './url-list.module.css';
import { fetchUrlList, deleteUrl } from './actions';

let baseUrl = 'https://buffshortener.vercel.app';
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8000';
}

interface URLListProps {
    urlList: { inputUrl: string | null, shortUrl: string | null }[];
}

export default function URLList({ urlList }: URLListProps) {
    return (
        <div className={styles.urlListOuter}>
            {(!urlList || urlList.length === 0) && (<h1 className={`no-highlight ${styles.urlListTitle}`}>No URLs found</h1>)}
            {urlList?.length > 0 && (
                <>
                    <h1 className={`no-highlight ${styles.urlListTitle}`}>URL List</h1>
                    <div className={styles.urlListInner}>
                        <table className={styles.urlTable}>
                            <colgroup>
                                <col style={{ width: '75%' }} />
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '5%' }} />
                            </colgroup>
                            <thead className={`no-highlight ${styles.tableHeader}`}>
                                <tr>
                                    <th>Input URL</th>
                                    <th>Short URL</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                                {urlList && urlList.map((url, index) => (
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
                </>
            )}
        </div>
    );
};

