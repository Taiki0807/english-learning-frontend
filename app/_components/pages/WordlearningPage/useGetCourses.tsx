import useSWR from 'swr';
import { getFetcher } from '@/utils/httpClient';

interface Courses {
  id: string;
  name: string;
  user: number;
}
export const useGetCourses = () => {
  const url = '/wordbook/courses/';
  const { data } = useSWR<Courses[]>(url, getFetcher);

  return {
    data: data,
  };
};
