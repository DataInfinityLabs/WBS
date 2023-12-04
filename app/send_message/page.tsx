// create a function component
import { redirect } from 'next/navigation';
import RegisterForm from '@/components/shared/auth/RegisterForm';
import { getSupabaseServerClient } from '@/app/utils/supabase_server_client';

const SendMessagePage = async () => {
    const supabaseClient = getSupabaseServerClient();
    const { data } = await supabaseClient.auth.getSession();
    if (!data.session) {
        redirect('/login');
    }

    console.log(data);
    
    return (
        <div>
            <h1>Send Message</h1>
        </div>
    );
};

export default SendMessagePage;
