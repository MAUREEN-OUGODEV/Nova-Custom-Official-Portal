import { useState } from 'react';
import { loguser } from '../utilities/utils';
import { useRouter } from 'next/navigation';
import cookie from 'cookiejs';
interface LoginData {
  username: string;
  password: string;
}
const useLogin = (initialLoginData: LoginData) => {
  const router = useRouter();
  const [user, setUser] = useState({token:''});
  const handleSignin = async () => {
      const response = await loguser(initialLoginData.username, initialLoginData.password)
      if (response.token ) {
        cookie.set('loginToken',response.token);
        router.push('/graphPage');
      }  else {
        router.push('/graphPage');
      }
      setUser(response)
}
return { user, handleSignin };
}
export default useLogin;