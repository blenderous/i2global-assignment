"use client";

import { TrashIcon } from "@heroicons/react/16/solid";
import { Button } from "./ui/button";
import { deleteNote } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function DeleteNote({ id }: { id: string }) {
  const router = useRouter();

  function deleteNoteAndRefresh(id: string) {
    deleteNote(id);
    router.refresh();
  }

  return (
    <Button
      onClick={() => deleteNoteAndRefresh(id)}
      className="block w-10 h-10 p-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon style={{ width: "100%", height: "100%" }} />
    </Button>
  );
}
