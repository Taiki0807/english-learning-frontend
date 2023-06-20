'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import {
  getFetcher,
  postFetcher,
} from '@/utils/httpClient';

interface Author {
  id: number;
  username: string;
}
interface AuthContextProps {
  user: Author | undefined;
  setUser: Dispatch<SetStateAction<Author | undefined>>;
  /* eslint-disable no-unused-vars */
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
}

interface AuthProps {
  children: ReactNode;
}
interface Status {
  status: number;
}
interface Refresh {
  refresh: string;
}

const AuthContext = createContext<
  Partial<AuthContextProps>
>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<Author | undefined>();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const isAvailableForViewing = pathname === '/signup';
  const loginUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    const res = await postFetcher(
      '/api/v1/login/',
      credentials
    );
    if (res.success === 1) {
      getUser();
    }
  };
  const getUser = async () => {
    const response: Author = await getFetcher(
      '/api/v1/get/'
    );
    if (response.username !== null) {
      setUser(response);
    }
  };
  const getStatus = useCallback(async () => {
    try {
      const response: Status = await getFetcher(
        '/api/v1/status/'
      );
      setStatus(response.status);
      if (response.status === 1 && isAvailableForViewing) {
        getUser();
        router.push('/about');
      } else if (
        !isAvailableForViewing &&
        response.status === 0
      ) {
        router.push('/signup');
      }
    } catch (error) {
      console.error(error);
      router.push('/signup');
    }
  }, [router, isAvailableForViewing]);

  const updateToken = useCallback(async () => {
    const response: Refresh = await getFetcher(
      '/api/v1/refresh-token/'
    );
    const refresh = response.refresh;
    if (refresh !== null) {
      await postFetcher('/api/v1/refresh/', {
        refresh: refresh,
      });
    }
    if (loading) {
      setLoading(false);
    }
  }, [loading]);
  const values: AuthContextProps = {
    user,
    setUser,
    loginUser,
  };
  useEffect(() => {
    getStatus();
  }, [getStatus]);

  useEffect(() => {
    const fourMinutes = 1000 * 4 * 60;
    const interval = setInterval(() => {
      if (loading && status) {
        updateToken();
      }
    }, fourMinutes);

    return () => {
      clearInterval(interval);
    };
  }, [loading, status, updateToken]);
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};
