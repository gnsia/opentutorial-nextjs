"use client";

import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            // console.log(`before fetch: title-${title} body-${body}`);
            // console.log(JSON.stringify({title, body}));
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body}),
            }
            fetch(process.env.NEXT_PUBLIC_API_URL+`topics`, options)
                .then(res=>res.json())
                .then(result=> {
                    console.log(result);
                    const lastId = result.id;
                    router.push(`/read/${lastId}`);
                    router.refresh();
                })
        }}>
            <h2>Create!</h2>
            <p>
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea name="body" placeholder="body"/>
            </p>
            <p>
                <input type="submit" value="Create!"/>
            </p>
        </form>
    )
}