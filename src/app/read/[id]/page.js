import { myServerClient } from "../../../../utils/supabase/server";
const supabase = myServerClient();

export default async function Read(props) {
    // supabase select는 무조건 배열로 데이터를 넘겨준다. eq를 해도 무조건!
    let { data: page, error } = await supabase.from('page').select('*').eq('id', props.params.id);
    const item = page[0];
    return (
        <>
            <h2>{item.title}</h2>
            {item.body}
        </>
    )
}