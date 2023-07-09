import useSWR from 'swr';
import { UserData } from './type';
import { getFetcher } from '@/utils/httpClient';

export const useGetReview = () => {
  const url = `/wordbook/reviews/`;
  const { data } = useSWR<UserData>(url, getFetcher);

  return {
    previewData: data,
  };
};
