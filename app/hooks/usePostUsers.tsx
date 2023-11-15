import { useState } from "react";
import { registerUser } from "../utilities/utils";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  email_address: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  custom_id: string;
  password: string;
  confirmPassword: string;
}

const useCreateUsers = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleRegister = async (formData: FormData) => {
    try {
      const createdUser = await registerUser(formData);
      if (createdUser && createdUser.custom_id) {
        setUser(createdUser);
        setError(createdUser.custom_id);
        setMessage("");
      } else if (createdUser) {
        setUser(createdUser);
        setError("");
        setMessage("Registration successful.");
        router.push("/login");
      } else {
        setError("Registration failed. Please try again.");
        setMessage("");
      }
    } catch (error) {
      setUser(null);
      setError("Registration failed. Please try again.");
      setMessage("");
    }
  };
  
  return { handleRegister, user, error, message };
};

export default useCreateUsers;
