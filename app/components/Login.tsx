"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import GoogleButton from "@/app/components/GoogleButton";
import { useRouter } from 'next/navigation';




const supabase = createClientComponentClient();

const handleSocialLogin = async (prov: any) => {
//const router = useRouter()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: prov,
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.log(error);
    return;
  }
//  router.push("/Success")
 
};

export default function SocialLoginForm() {
 
  return (
    <>
      <div>
        <GoogleButton handleClickMethod={handleSocialLogin} />
      
      </div>
    </>
  );
}