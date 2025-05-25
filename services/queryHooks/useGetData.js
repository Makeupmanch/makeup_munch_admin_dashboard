import { useQuery,useInfiniteQuery } from "@tanstack/react-query";
import { getData } from "../apiService";

export const useGetData = (key, url, params = {}) => {
  return useQuery({
    queryKey: [key, params], // This is the new way to pass query keys in React Query v5
    queryFn: () => getData(url, params), // The function that fetches the data
  });
};



export const useGetInfiniteData = (key, url, params = {}) => {
  return useInfiniteQuery({
    queryKey: [key, params],
    queryFn: ({ pageParam }) => getData(`${url}?page=${pageParam}`, params),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Implement your pagination logic here
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
  });
};