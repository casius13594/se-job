"use server"

import { createClient } from '@/utils/supabase/server';

export async function selectNotes() {
    const supabase = createClient();
    const {data: notes}  = await supabase.from("notes").select();
    return(
        <div>
            {notes?.map((note: any) => (
                <ul>
                    <li>{note.id} - {note.title}</li>
                </ul>
            ))}
        </div>
    );
}

export async function insertNotes(i: number, t: string) {
    const supabase = createClient();
    await supabase
        .from('notes')
        .insert([
            { id: i, title: t }
    ]);
}