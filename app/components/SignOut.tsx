// SignOutButton.tsx
'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
const supabase = createClientComponentClient();


const handleSignOut = async () => {
//   const router = useRouter()
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    // サインアウト成功時の処理
    // 例えば、ログイン画面へリダイレクトするなど
    // router.push("/")
    alert("サインアウトしました")
  }
};

const SignOutButton = () => {
  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;