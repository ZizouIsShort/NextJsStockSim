'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { createClient } from '@/utils/supabase/server'
import {User} from "@supabase/auth-js";


export async function login(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: authData,error } = await supabase.auth.signInWithPassword(data)

    console.log(data)


    if (error) {
        redirect('/error')

    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')


}

export async function signup(formData: FormData) {

    const supabase = createClient()
    // Extract email and password from formData
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate input
    if (!email || !password) {
        console.error('Email or password is missing!');
        redirect('/error'); // Redirect to an error page
        return;
    }

    // Step 1: Sign up the user using Supabase Authentication
    const { user, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        console.error('Error during Supabase Auth signup:', authError.message);
        redirect('/error');
        return;
    }

    console.log('User signed up successfully with Supabase Auth:', user);

    // Step 2: Insert user into your custom table
    const customUser = {
        email: email,
        password: password, // In practice, hash the password
    };

    const { data: insertedData, error: tableError } = await supabase
        .from('Smth') // Replace 'Smth' with your table name
        .insert([customUser]);

    console.log(insertedData)

    if (tableError) {
        console.error('Error inserting user into custom table:', tableError.message);
        redirect('/error');
        return;
    }

    console.log('User added successfully to custom table:', insertedData);

    // Step 3: Redirect to validation page
    redirect('/validate');
}