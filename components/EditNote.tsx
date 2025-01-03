"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { type Note } from "@/lib/types";
import { useRouter } from "next/navigation";

export function EditeNote({ id, title, content }: Note) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <span className="inline-block w-10 h-10 p-2 rounded-md bg-cyan-500 text-white">
            <span className="sr-only">Edit</span>
            <PencilIcon />
          </span>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new note</DialogTitle>
              <DialogDescription>
                Edit the title and content of your note. Click submit when you
                are done.
              </DialogDescription>
            </DialogHeader>
            {/* Edit Note Form */}
            <EditNoteForm
              setOpen={setOpen}
              id={id}
              title={title}
              content={content}
            />
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}

function EditNoteForm({
  id,
  title,
  content,
  setOpen,
}: Note & { setOpen: (open: boolean) => void }) {
  const [titleField, setTitleField] = useState(title);
  const [contentField, setContentField] = useState(content);
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var payload = {
      id: id,
      title: titleField,
      content: contentField,
    };

    try {
      fetch(`http://localhost:4000/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then(() => {
        setOpen(false);
      });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
    router.refresh();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          value={titleField}
          onChange={(e) => setTitleField(e.target.value)}
          id="title"
          type="text"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Input
          value={contentField}
          onChange={(e) => setContentField(e.target.value)}
          id="content"
          type="text"
        />
      </div>
      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
}
