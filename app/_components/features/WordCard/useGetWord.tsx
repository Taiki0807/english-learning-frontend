import useSWR from 'swr';
import { getFetcher } from '@/utils/httpClient';

interface Word {
  id: string;
  word: string;
  meaning: string;
  user: number;
  last_review_date: string | null;
  next_review_date: string | null;
}

interface Props {
  id: string;
}
export const useGetWord = ({ id }: Props) => {
  const url = `/wordbook/flashcards/${id}/`;
  const { data } = useSWR<Word>(url, getFetcher);

  return {
    Data: data,
  };
};
