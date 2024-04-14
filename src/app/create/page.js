"use client";
import { useRouter } from "next/navigation";
import { myServerClient } from "../../../utils/supabase/server";

export default function Create() {
    
    const router = useRouter();
    const supabase = myServerClient();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const body = e.target.body.value;
        const { data, error } = await supabase
            .from('page')
            .insert([
                { title, body },
            ]).select();
        const id = data[0].id;
        router.push(`/read/${id}`);
        router.refresh();
    }

    return (
        <form onSubmit={e => onSubmitHandler(e)}>
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