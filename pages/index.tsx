import { GetStaticProps } from 'next';

import Main from '@/components/main/Main';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default function Home() {
  return <Main />;
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

