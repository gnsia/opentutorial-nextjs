"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const params = useParams();
    const id = params.id;
    useEffect(()=>{
        fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id)
        .then(resp => resp.json())
        .then(result => {
            setTitle(result.title);
            setBody(result.body);
        });
    }, []);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            // console.log(`before fetch: title-${title} body-${body}`);
            // console.log(JSON.stringify({title, body}));
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body}),
            }
            fetch(`http://localhost:9999/topics/`+id, options)
                .then(res=>res.json())
                .then(result=> {
                    console.log(result);
                    const lastId = result.id;
                    router.push(`/read/${lastId}`);
                    router.refresh();
                })
        }}>
            <h2>Update!</h2>
            <p>
                <input type="text" name="title" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </p>
            <p>
                <textarea name="body" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)}/>
            </p>
            <p>
                <input type="submit" value="Update!"/>
            </p>
        </form>
    )
}