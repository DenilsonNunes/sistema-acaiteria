import api from "@/api/axios";
import { AxiosError } from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react"
import { toast } from "sonner";






type UserData = {
  id: number;
  user: string;
  name: string;
  email: string;
}



type AuthContextData = {
  user: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: string, password: string) => Promise<void>;
  logout: () => void;
  userData: UserData | null;
};






export const AuthContext = createContext({} as AuthContextData)




export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [ userData, setUserData ] = useState<UserData | null>(null);


  // Carrega usuário do localStorage ao iniciar
  useEffect(() => {

    const token = localStorage.getItem('@Auth:token');
    const user = localStorage.getItem('@Auth:userId');

    if (token && user) {

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

    }

    setIsLoading(false);

  }, []);


  const login = async (user: string, password: string) => {
    

    try {

      const response = await api.post('/auth/login', { user, password });

      const { 
        id:userId,
        usuario, 
        nome: userName, 
        email: userEmail,
        token
      } = response.data;
      
      //Salva no localStorage
      localStorage.setItem('@Auth:userId',  userId); 
      localStorage.setItem('@Auth:token', token);
      
      //Define token para requisições futuras
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userId);

      setUserData({
        id: userId,
        user: usuario,
        name: userName,
        email: userEmail
      })


    } catch (error) {

      if(error instanceof AxiosError) {

        if(error?.message === 'Network Error') {
          throw new Error("Erro de rede. Verifique sua conexão e tente novamente mais tarde.")
        }

        if(error.response?.data.message) {

          throw new Error(error.response?.data.message)      

        }
      
      }


    }
  };



  const logout = () => {

    localStorage.removeItem('@Auth:userId');
    localStorage.removeItem('@Auth:token');
    setUser(null);
    setUserData(null)
    
  };




  return (
    <AuthContext.Provider
      value={{login, logout, user, isAuthenticated:!!user, isLoading, userData}}
    >
      {children}
    </AuthContext.Provider>
  )
}

