const updateList = document.querySelector("#update-list");
const emptyState = document.querySelector("#empty-state");
const feedStatus = document.querySelector("#feed-status");
const updateCount = document.querySelector("#update-count");

function isValidUpdate(update) {
  if (
    !update ||
    typeof update.title !== "string" ||
    typeof update.summary !== "string" ||
    typeof update.category !== "string" ||
    typeof update.source !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(update.publishedAt)
  ) {
    return false;
  }

  try {
    const sourceUrl = new URL(update.sourceUrl);
    return sourceUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${dateString}T00:00:00Z`));
}

function createUpdateCard(update) {
  const item = document.createElement("li");
  item.className = "update-card";

  const metadata = document.createElement("p");
  metadata.className = "metadata";
  metadata.textContent = `${update.category} · ${formatDate(update.publishedAt)}`;

  const title = document.createElement("h3");
  title.textContent = update.title;

  const summary = document.createElement("p");
  summary.className = "summary";
  summary.textContent = update.summary;

  const source = document.createElement("a");
  source.className = "source-link";
  source.href = update.sourceUrl;
  source.target = "_blank";
  source.rel = "noopener noreferrer";
  source.textContent = `Read at ${update.source}`;

  item.append(metadata, title, summary, source);
  return item;
}

function renderUpdates(updates) {
  updateList.replaceChildren(...updates.map(createUpdateCard));
  emptyState.hidden = updates.length > 0;
  updateCount.textContent = `${updates.length} ${updates.length === 1 ? "update" : "updates"}`;
  feedStatus.textContent = updates.length
    ? "Updates are ordered by publication date."
    : "No updates are available yet.";
}

async function loadUpdates() {
  try {
    const response = await fetch("updates.json");
    if (!response.ok) {
      throw new Error(`The update feed returned HTTP ${response.status}.`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || !data.every(isValidUpdate)) {
      throw new Error("The update feed does not match the required format.");
    }

    const updates = [...data].sort((first, second) =>
      second.publishedAt.localeCompare(first.publishedAt),
    );
    renderUpdates(updates);
  } catch (error) {
    updateList.replaceChildren();
    emptyState.hidden = false;
    emptyState.textContent = "Updates are temporarily unavailable. Please try again later.";
    updateCount.textContent = "";
    feedStatus.textContent = "The update feed could not be loaded.";
    console.error("Unable to load AI updates:", error);
  }
}

loadUpdates();
