"use server"
import {createClient} from "@/utils/supabase/server"

export async function signUpWithEmailAndPassword(data: {
    email: string;
    password: string;
    confirm: string;
}) {
    const supabase = await createClient();
    try {
        const result = await supabase.auth.signUp({
            email: data.email,
            password: data.password
        });

        if (result.error) {
            // Handle the error
            console.error('Sign-up error:', result.error.message);
            return JSON.stringify({ error: result.error.message });
        } else {
            // User signed up successfully
            console.log('User signed up:', result);
            return JSON.stringify(result);
        }
    } catch (error) {
        // Handle unexpected errors
        console.error('An unexpected error occurred:', error);
        return JSON.stringify({ error: 'An unexpected error occurred.' });
    };
};

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

export async function signOutUser() {
    const supabase = await createClient();
    try {
      // Sign out the user
      const { error } = await supabase.auth.signOut();
  
      if (error) {
        console.error('Sign-out error:', error.message);
        // Handle sign-out error if needed
      } else {
        console.log('User signed out successfully');
        // Handle successful sign-out, e.g., redirect to the login page
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      // Handle unexpected errors during sign-out
    }
};


