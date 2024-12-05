import { UseFormReturn } from "react-hook-form";
import { create } from "zustand";

export type ModalType = "todo" | "note" | "goal" | "link";
export type ModalMode = "create" | "edit" | "add";

export interface FormData {
  id: number;
  title: string;
  description?: string;
  done?: boolean;
  fileUrl?: string;
  linkUrl?: string;
  goal?: {
    id: number;
    title: string;
  };
}

interface FormModalData {
  defaultValues?: FormData;
  type: ModalType;
  mode: ModalMode;
}

interface FormModalStore {
  isOpen: boolean;
  data: FormModalData | null;
  onSubmit?: (data: FormData) => void;
  onOpen: (data: FormModalData & { onSubmit: (data: FormData) => void }) => void;
  onClose: () => void;
}

export const useFormModal = create<FormModalStore>((set) => ({
  isOpen: false,
  data: null,
  onSubmit: undefined,
  onOpen: ({ onSubmit, ...data }) =>
    set({
      isOpen: true,
      data,
      onSubmit,
    }),
  onClose: () =>
    set({
      isOpen: false,
      data: null,
      onSubmit: undefined,
    }),
}));
