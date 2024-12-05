import { Note } from "@/types/note";
import Link from "next/link";
import { ensureHttps } from "@/utils/url";
import NoteWriteEditor from "../editor/note-write-editor";
import NoteViewEditor from "../editor/note-view-editor";
interface NoteContentProps {
  noteData: Note;
}

export const NoteContent = ({ noteData }: NoteContentProps) => {
  return (
    <article className="p-4">
      <section className="prose prose-sm max-w-none">
        {noteData?.linkUrl && (
          <div className="mb-6">
            <Link
              href={ensureHttps(noteData.linkUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-gray-200 px-4 py-1 rounded-3xl break-all text-base leading-6 font-normal font-pretendard underline-offset-[from-font] decoration-skip-ink-none"
            >
              {noteData.linkUrl}
            </Link>
          </div>
        )}
        <div className="whitespace-pre-wrap text-gray-600">
          <NoteViewEditor content={noteData.content} />
        </div>
      </section>
    </article>
  );
};
