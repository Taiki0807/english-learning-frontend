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
  postFileFetcher,
} from '@/utils/httpClient';

interface Author {
  id: number;
  username: string;
  email: string;
  image: string;
}
interface AuthContextProps {
  user: Author | undefined;
  setUser: Dispatch<SetStateAction<Author | undefined>>;
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  createUser: (userData: {
    username: string;
    email: string;
    password: string;
    fileUrl: string;
  }) => Promise<void>;
  uploadFile: (file: File) => Promise<string>;
  updateToken: () => Promise<void>;
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
  const isAvailableForViewing =
    pathname == ('/signup' || '/signin');
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
  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await postFileFetcher(
        '/api/v1/image/post/',
        formData
      );

      const fileUrl = response.file.url;
      return fileUrl;
    } catch (error) {
      console.error(error);
      throw new Error(
        'ファイルのアップロードに失敗しました'
      );
    }
  };
  const createUser = async (userData: {
    username: string;
    email: string;
    password: string;
    fileUrl: string;
  }) => {
    try {
      console.log(userData.username);
      console.log(userData.fileUrl);
      await postFetcher('/api/v1/register/', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        image: userData.fileUrl,
      });
    } catch (error) {
      console.error(error);
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

  const updateToken = useCallback(async () => {
    try {
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
    } catch (error) {
      console.error(error);
      router.push('/signin');
    }
  }, [loading, router]);

  const getStatus = useCallback(async () => {
    try {
      const response: Status = await getFetcher(
        '/api/v1/status/'
      );
      setStatus(response.status);
      if (response.status === 1) {
        getUser();
      }
      if (response.status == 1 && isAvailableForViewing) {
        getUser();
        router.push('/about');
      } else if (
        !isAvailableForViewing &&
        response.status === 0
      ) {
        updateToken();
      }
    } catch (error) {
      console.error(error);
      updateToken();
    }
  }, [router, isAvailableForViewing, updateToken]);
  const values: AuthContextProps = {
    user,
    setUser,
    loginUser,
    createUser,
    uploadFile,
    updateToken,
  };
  useEffect(() => {
    getStatus();
  }, [getStatus]);

  useEffect(() => {
    if (loading) {
      updateToken();
      console.log('update token');
    }

    const fourMinutes = 1000 * 4 * 60;
    const interval = setInterval(() => {
      updateToken();
      console.log('fresh');
    }, fourMinutes);

    return () => {
      clearInterval(interval);
    };
  }, [loading, status, updateToken]);

  useEffect(() => {
    const handleWindowFocus = () => {
      getStatus();
    };
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener(
        'focus',
        handleWindowFocus
      );
    };
  }, [getStatus]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};
