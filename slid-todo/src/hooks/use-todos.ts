import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getTodos } from "@/actions/todo/todos";

export const useTodosInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["todos", "infinite"],
    queryFn: ({ pageParam = 0 }) => getTodos(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};

export const useTodosOnce = () => {
  return useQuery({
    queryKey: ["todos", "once"],
    queryFn: () => getTodos(0),
  });
};
