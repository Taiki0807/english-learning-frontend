'use client';
import { WordDetailPage } from '@/app/_components/pages';

interface Props {
  params: { id: string };
}
const page = ({ params }: Props) => {
  return (
    <div>
      <WordDetailPage id={params.id} />
    </div>
  );
};

export default page;
