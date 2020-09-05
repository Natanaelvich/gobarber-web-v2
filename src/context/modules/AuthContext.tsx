import React, { createContext, useCallback } from 'react';
import api from '../../services/api';

interface SingnCredencials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(crendencial: SingnCredencials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    console.log('teste');

    const response = await api.post('sessions', {
      email,
      password,
    });

    console.log(response.data);
  }, []);
  return (
    <AuthContext.Provider value={{ name: 'natan', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
