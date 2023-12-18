"use server"
import {createClient} from "@/utils/supabase/server"

export async function signUpWithEmailAndPassword(data: {
    email: string;
    password: string;
    confirm: string;
}) {
    const supabase = await createClient();

    const result = await supabase.auth.signUp({email: data.email, password: data.password});


    return JSON.stringify(result)

}

export async function readUserAuth() {
    const supabase = await createClient();
    const userAuth = await supabase.auth.getUser();
    return userAuth;
};

export async function insertNotes(i: string, t: string) {
    const supabase = createClient();
    await supabase
        .from('User')
        .insert([
            { user_id: i, type: t }
    ]);
};



