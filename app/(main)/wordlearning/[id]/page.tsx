'use client';
import dynamic from 'next/dynamic';

const WordPage = dynamic(
  async () => {
    const importedModule = await import(
      '@/app/_components/pages/WordPage/WordPage'
    );
    return importedModule.WordPage;
  },
  { ssr: false }
);

interface Props {
  params: { id: string };
}
const page = ({ params }: Props) => {
  return <WordPage id={params.id} />;
};

export default page;
