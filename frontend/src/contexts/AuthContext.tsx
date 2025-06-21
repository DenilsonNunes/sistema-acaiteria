import api from "@/api/axios";
import { createContext, useContext, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom";


type User = {
  user: string;
  password: number;
}



type AuthContextData = {
  //user: User | null;
  //isAuthenticated: boolean;
  login: (user: string, password: string) => Promise<void>;
  //logout: () => void;
};






const AuthContext = createContext({} as AuthContextData)




export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);
  //const navigate = useNavigate();

  

  const login = async (user: string, password: string) => {

    try {

      console.log("Chega algo", typeof user)
      console.log("Chega algo", typeof password)

      const response = await api.post('/auth/login', { user, password });
      
      console.log('resposta', response)
    
      // Salva no localStorage
      //localStorage.setItem('@Auth:user', user); 
      //localStorage.setItem('@Auth:token', token);

      // Define token para requisições futuras
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUserData(user);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };




  return (
    <AuthContext.Provider
      value={{login }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);