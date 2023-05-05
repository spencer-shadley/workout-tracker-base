import Main from '@/components/main/Main';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetStaticProps } from 'next';

export default function Home() {
  return <Main />;
}

// TODO: pre-hydrate requests
// https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/
export const getStaticProps: GetStaticProps = async () => {
  // const id = context. params?.id as string;
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(["getPokemon", id],
  //   () => fetchPokemon(id)
  // );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// };
