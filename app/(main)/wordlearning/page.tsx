import { WordlearningPage } from '@/app/_components/pages';

const page = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <WordlearningPage />
    </>
  );
};

export default page;
