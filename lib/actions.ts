export function deleteNote(id: string) {
  try {
    fetch(`http://localhost:4000/notes/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}
