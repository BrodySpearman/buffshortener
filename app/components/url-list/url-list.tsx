'use client'
import styles from './url-list.module.css';
import { deleteUrl } from './actions';
import { useState, useEffect } from 'react';

const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL);

interface URLListProps {
    urlList: { inputUrl: string | null, shortUrl: string | null }[];
}

export default function URLList({ urlList }: URLListProps) {
    const [urlCount, setUrlCount] = useState(urlList?.length || 0);

    useEffect(() => {
        setUrlCount(urlList?.length || 0);
    }, [urlList]);

    return (
        <div className={styles.urlListOuter}>
            {(!urlList || urlList.length === 0) && (<h1 className={`no-highlight ${styles.urlListTitle}`}>No URLs found</h1>)}
            {urlList?.length > 0 && (
                <>
                    <h1 className={`no-highlight ${styles.urlListTitle}`}>URL List</h1>
                    <div className={styles.urlListInner}>
                        <table className={styles.urlTable}>
                            <colgroup>
                                <col className={styles.urlCol1} />
                                <col className={styles.urlCol2} />
                                <col className={styles.urlCol3} />
                            </colgroup>
                            <caption className={`no-highlight ${styles.urlCount}`}>{urlCount}/10</caption>
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

