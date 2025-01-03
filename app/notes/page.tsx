import AddNote from "@/components/AddNote";
import { EditeNote } from "@/components/EditNote";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Note } from "@/lib/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";

export default async function Notes() {
  const notes = await fetch("http://localhost:4000/notes").then((res) =>
    res.json()
  );
  return (
    <div className="p-4">
      <h2 className="text-4xl">Notes</h2>
      <p>Good morning user!</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {notes.map((note: Note) => (
          <li key={note.id}>
            <Note id={note.id} title={note.title} content={note.content} />
          </li>
        ))}
        <li>
          <AddNote />
        </li>
      </ul>
    </div>
  );
}

function Note({ id, title, content }: Note) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center justify-end gap-2">
          <EditeNote id={id} title={title} content={content} />
          <Button>
            <span className="sr-only">Delete</span>
            <TrashIcon />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
