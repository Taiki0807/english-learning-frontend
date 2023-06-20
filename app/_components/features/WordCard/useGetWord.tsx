import useSWR from 'swr';
import { getFetcher } from '@/utils/httpClient';

interface Word {
  id: string;
  word: string;
  meaning: string;
  user: number;
  lastReviewDate: string | null;
  nextReviewDate: string | null;
}

interface Props {
  id: string;
}
export const useGetWord = ({ id }: Props) => {
  const url = `/wordbook/flashcards/${id}/`;
  const { data } = useSWR<Word>(url, getFetcher);

  return {
    data: data,
  };
};
