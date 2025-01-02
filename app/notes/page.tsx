import AddNote from "@/components/AddNote";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Note } from "@/lib/types";
import { PlusIcon } from "lucide-react";

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
            <Card>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{note.content}</p>
              </CardContent>
              {/* <CardFooter>
                <p>Last modified: </p>
              </CardFooter> */}
            </Card>
          </li>
        ))}
        <li>
          <AddNote />
        </li>
      </ul>
    </div>
  );
}
