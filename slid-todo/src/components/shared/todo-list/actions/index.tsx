import { useState } from "react";
import { Todo } from "@/types/todo";
import { Note } from "@/types/note";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";
import { ActionButtons } from "@/components/shared/action-buttons";
import { MoreMenu } from "@/components/shared/more-menu";
import { NoteViewer } from "@/components/shared/note-viewer";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";
import { devLog } from "@/utils/dev-log";
interface TodoActionsProps {
  todo: Todo;
}

const TodoActions = ({ todo }: TodoActionsProps) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteData, setNoteData] = useState<Note | null>(null);
  const { deleteTodo, updateTodo } = useTodoActions(todo);

  const handleNoteClick = async () => {
    try {
      const response = await instance.get(`/notes/${todo.noteId}`);
      setNoteData(response.data);
      setIsNoteOpen(true);
    } catch (error) {
      console.error("노트 조회 실패:", error);
      toast.error("노트 조회에 실패했습니다.");
    }
  };
  // devLog("actions todo-list Item : ", todo);
  return (
    <>
      <div className="ml-auto flex items-center gap-2 text-gray-400">
        <ActionButtons
          data-cy="action-buttons"
          linkUrl={todo.linkUrl}
          fileUrl={todo.fileUrl}
          hasNote={!!todo.noteId}
          onNoteClick={handleNoteClick}
        />
        <MoreMenu
          onDelete={{
            title: "할 일을 삭제하시겠어요?",
            description: "삭제한 할 일은 복구할 수 없습니다.",
            action: async () => {
              await deleteTodo();
            },
          }}
          onEdit={{
            type: "todo",
            data: todo,
            action: async (data) => {
              devLog("actions submit data : ", data);
              await updateTodo(data);
            },
          }}
        />
      </div>
      <NoteViewer
        data-cy="note-viewer"
        isOpen={isNoteOpen}
        onOpenChange={setIsNoteOpen}
        todo={todo}
        noteData={noteData}
      />
    </>
  );
};

export default TodoActions;
