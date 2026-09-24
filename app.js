const storageKey = "learning-notes";

const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const list = document.querySelector("#note-list");
const emptyState = document.querySelector("#empty-state");
const count = document.querySelector("#note-count");
const statusMessage = document.querySelector("#status-message");

let notes = loadNotes();

function loadNotes() {
  try {
    const savedNotes = localStorage.getItem(storageKey);

    if (!savedNotes) {
      return [];
    }

    const parsedNotes = JSON.parse(savedNotes);
    if (!Array.isArray(parsedNotes)) {
      throw new Error("Saved notes were not a list.");
    }

    return parsedNotes.filter(
      (note) =>
        typeof note?.id === "string" &&
        typeof note?.text === "string" &&
        note.text.trim().length > 0,
    );
  } catch (error) {
    showStatus("Your saved notes could not be loaded. You can still add new notes.");
    console.error("Unable to load notes from localStorage:", error);
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(notes));
    return true;
  } catch (error) {
    showStatus("Your note could not be saved. Check your browser storage settings.");
    console.error("Unable to save notes to localStorage:", error);
    return false;
  }
}

function showStatus(message) {
  statusMessage.textContent = message;
}

function renderNotes() {
  list.replaceChildren();

  for (const note of notes) {
    const item = document.createElement("li");
    item.className = "note";

    const text = document.createElement("p");
    text.textContent = note.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete note: ${note.text}`);
    deleteButton.addEventListener("click", () => deleteNote(note.id));

    item.append(text, deleteButton);
    list.append(item);
  }

  emptyState.hidden = notes.length > 0;
  count.textContent = `${notes.length} ${notes.length === 1 ? "note" : "notes"}`;
}

function deleteNote(noteId) {
  const nextNotes = notes.filter((note) => note.id !== noteId);

  if (nextNotes.length === notes.length) {
    return;
  }

  notes = nextNotes;
  if (saveNotes()) {
    renderNotes();
    showStatus("Note deleted.");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    showStatus("Enter a note before saving.");
    input.focus();
    return;
  }

  const note = {
    id: crypto.randomUUID(),
    text,
  };

  notes.unshift(note);
  if (saveNotes()) {
    input.value = "";
    renderNotes();
    showStatus("Note saved in this browser.");
    input.focus();
  } else {
    notes.shift();
  }
});

renderNotes();
