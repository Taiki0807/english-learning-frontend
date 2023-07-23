import useSWR from 'swr';
import { getFetcher } from '@/utils/httpClient';

interface CourseAccessHistory {
  id: string;
  user: number;
  course: {
    id: string;
    name: string;
    user: number;
  };
  accessed_at: string;
}

export const useGetRecentlyAccessedCourses = () => {
  const url = `/wordbook/recently-accessed-courses/`;
  const { data } = useSWR<CourseAccessHistory[]>(
    url,
    getFetcher
  );

  return {
    accessedCourses: data,
  };
};
