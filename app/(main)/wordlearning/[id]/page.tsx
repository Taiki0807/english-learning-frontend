import { WordPage } from '@/app/_components/pages/WordPage';

interface Props {
  params: { id: string };
}
const page = ({ params }: Props) => {
  return <WordPage id={params.id} />;
};

export default page;
