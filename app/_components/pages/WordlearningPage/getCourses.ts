import { getFetcher } from '@/utils/httpClient';

interface Courses {
  id: number;
  name: string;
}

export const getCourses = async () => {
  const data = await getFetcher<Courses[]>(
    '/wordbook/courses/'
  );
  return {
    Data: data,
  };
};
