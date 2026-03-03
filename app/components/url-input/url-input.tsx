'use client'
import styles from './url-input.module.css';
import Form from 'next/form';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitVal } from './form/formsubmit';
import { useState } from 'react';


const urlSchema = z.object({
    inputUrl: z.string().nonempty("Field cannot be empty").url("Invalid URL"),
});

type urlData = z.infer<typeof urlSchema>;

export default function URLInput() {
    const { register, handleSubmit, formState: { errors } } = useForm<urlData>({ resolver: zodResolver(urlSchema) });
    const [inputVal, setInputVal] = useState('');

    function onSubmit(data: urlData) {
        const formData = new FormData();
        formData.append('inputUrl', data.inputUrl);
        submitVal(formData);
        setInputVal('');
    }

    return (
        <>
            <div className={styles.urlInputContainer}>
                <form className={styles.urlInputForm} onSubmit={handleSubmit(onSubmit)}>
                    <input className={styles.urlInput} placeholder="Enter or paste link to anything..." {...register("inputUrl")}
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)} />
                    <button className={styles.urlInputButton} type="submit">Shorten URL</button>
                </form>
            </div>
            {errors.inputUrl && <p className={styles.error}>{errors.inputUrl.message}</p>}
        </>
    );
}