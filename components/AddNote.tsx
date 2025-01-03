"use client";

// import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { PlusIcon } from "@heroicons/react/16/solid";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function AddNote() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <span className="sr-only">Add a new note</span>
          <PlusIcon
            className="text-cyan-600"
            style={{ width: "6rem", height: "6rem" }}
          />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new note</DialogTitle>
              <DialogDescription>
                Enter the title and content of your note. Click submit when you
                are done.
              </DialogDescription>
            </DialogHeader>
            {/* Add Note Form */}
            <AddNoteForm setOpen={setOpen} />
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

function AddNoteForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    var payload = {
      id: uuidv4(),
      title: title,
      content: content,
    };

    try {
      fetch("http://localhost:4000/notes", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data);
          setOpen(false);
        });
    } catch (error) {
      console.error((error as Error).message);
    }
    event.preventDefault();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="title">Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          type="text"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="content">Content</Label>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="content"
          type="text"
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
