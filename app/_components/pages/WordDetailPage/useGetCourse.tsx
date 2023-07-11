import useSWR from 'swr';
import { Course } from './type';
import { getFetcher } from '@/utils/httpClient';

export const useGetCourse = (courseID: string) => {
  const { data } = useSWR<Course>(
    `/wordbook/courses/${courseID}/`,
    getFetcher
  );

  return {
    courseTitle: data,
  };
};
