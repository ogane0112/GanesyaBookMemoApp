// LoginSuccessPage.tsx
'use client';
import { useRouter } from 'next/navigation';

const LoginSuccessPage = () => {
 const router = useRouter();

  return (
    <div>
      <h1>Login Successful!</h1>
      <p>You have successfully logged in.</p>
      <button onClick={()=>router.push("/")}>Go to Home</button>
    </div>
  );
};

export default LoginSuccessPage;