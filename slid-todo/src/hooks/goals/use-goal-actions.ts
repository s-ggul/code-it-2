import { Goal } from "@/types/goal";
import { instance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CreateGoalRequest {
  title: string;
}

interface UpdateGoalRequest {
  title: string;
}

export const useGoalActions = (goal?: Goal) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: createGoal } = useMutation({
    mutationFn: async (newGoal: CreateGoalRequest) => {
      const response = await instance.post("/goals", newGoal);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("목표가 추가되었습니다.");
    },
    onError: () => {
      toast.error("목표 추가에 실패했습니다.");
    },
  });

  const { mutate: updateGoal } = useMutation({
    mutationFn: async ({ goalId, title }: { goalId: number; title: string }) => {
      if (!goalId) return;
      await instance.patch(`goals/${goalId}`, { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("목표가 수정되었습니다.");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "목표 수정에 실패했습니다.";
      toast.error(errorMessage);
    },
  });
  const { mutate: deleteGoal } = useMutation({
    mutationFn: async (goalId: number) => {
      if (!goalId) return;
      await instance.delete(`goals/${goalId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("목표가 삭제되었습니다.");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "목표 삭제에 실패했습니다.";
      toast.error(errorMessage);
    },
  });

  return {
    createGoal,
    updateGoal,
    deleteGoal,
  };
};
