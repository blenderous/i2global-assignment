"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

import { PlusIcon } from "@heroicons/react/16/solid";

import { Button } from "./ui/button";
import {
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { revalidatePath } from "next/cache";

export default function AddNote() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <span className="sr-only">Add a new note</span>
          <PlusIcon
            className="text-cyan-600"
            style={{ width: "6rem", height: "6rem" }}
          />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <DialogHeader>
              <DialogTitle>Create a new note</DialogTitle>
              <DialogDescription>
                Enter the title and content of your note. Click submit when you
                are done.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={(event) => {
                var payload = {
                  id: "3",
                  title: "Carry a water bottle",
                  content: "Avoid buying water in plastic bottles.",
                };

                // var data = new FormData();
                // data.append("json", JSON.stringify(payload));

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
                    revalidatePath("/notes");
                    setOpen(false);
                  });
                event.preventDefault();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" type="text" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Input id="content" type="text" />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
