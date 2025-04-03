// src/context/AuthContext.tsx
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { authApi, LoginCredentials, User } from '../services/authService';
import { useNavigate } from 'react-router';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  // Query for fetching current user
  const { 
    data: user, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    // Only try to fetch if we have a token
    enabled: !!localStorage.getItem('auth_token'),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Save token to localStorage
      localStorage.setItem('auth_token', data.token);
      // Update user data in the cache
      queryClient.setQueryData(['currentUser'], data.user);
      // Redirect to dashboard
      navigate('/dashboard');
    },
  });
  
  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear user from cache
      queryClient.setQueryData(['currentUser'], null);
      queryClient.clear();
      // Redirect to login
      navigate('/login');
    },
  });

  // Handle token expiration or unauthorized responses
  useEffect(() => {
    const handleUnauthorized = (error: any) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem('auth_token');
        queryClient.setQueryData(['currentUser'], null);
        navigate('/login');
      }
    };

    // Add a response interceptor
    const interceptor = authApi.logout;
    // Remove interceptor on cleanup
    return () => {
      // This is a simplified example. In a real app, you'd use axios
      // interceptors properly to handle 401 responses
    };
  }, [queryClient, navigate]);

  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const value = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    error: (loginMutation.error || error) as Error | null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};