import { ERROR_RESPONSE } from "@common/error";
import useError from "@frontend/hooks/useError";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import React from "react";

const ReactQueryProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { setError, resetError } = useError();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        const e = error as AxiosError<ERROR_RESPONSE>;
        if (e.response?.data.code) {
          setError(e.response.data.code, true);
        }
      },
    }),
    mutationCache: new MutationCache({
      onMutate: () => {
        console.log("onMutate");
        resetError();
      },
      onError: (error) => {
        const e = error as AxiosError<ERROR_RESPONSE>;
        if (e.response?.data.code) {
          console.log(e.response.data.code);
          setError(e.response.data.code, true);
        }
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
