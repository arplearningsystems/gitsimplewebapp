# AI Update Board

A lightweight, curated AI-updates site designed for GitHub Pages:

- **`updates.json`** is the public content feed. It is versioned in GitHub and contains each published update.
- **`index.html`** defines the page structure.
- **`styles.css`** controls the responsive visual design.
- **`app.js`** loads, validates, sorts, and renders the feed in a visitor's browser.

## Publish an AI update

1. Edit `updates.json`.
2. Add a new object to the JSON array. Use the original source's publication date and link directly to that source:

   ```json
   {
     "title": "Clear, factual title",
     "summary": "A short summary written in your own words.",
     "category": "Research",
     "publishedAt": "2026-09-24",
     "source": "Source organisation",
     "sourceUrl": "https://example.com/original-announcement"
   }
   ```

3. Keep entries separated with commas and ensure the file remains valid JSON.
4. Publish the change:

   ```bash
   git add updates.json
   git commit -m "Publish AI update"
   git push
   ```

GitHub Pages redeploys automatically after the push. The page sorts updates newest first.

Only publish summaries you have written yourself and link to the original source. Do not store credentials, API keys, or private information in this repository.

## Run it locally

Use a local static server so the browser can load `updates.json`. If you have Python installed:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Publish with GitHub Pages

1. Create a new empty repository on [GitHub](https://github.com/new), for example `ai-update-board`.
2. In this project folder, initialize Git and push the files:

   ```bash
   git init
   git add index.html styles.css app.js updates.json README.md
   git commit -m "Create AI update board"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ai-update-board.git
   git push -u origin main
   ```

3. On GitHub, open the repository’s **Settings** → **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/(root)` folder, then save.
6. GitHub will show the public URL, typically `https://YOUR-USERNAME.github.io/ai-update-board/`.

Each future `git add`, `git commit`, and `git push` to `main` will update the deployed site.

## Add a custom domain later

After buying or using a domain from a domain provider:

1. In the GitHub repository’s **Settings** → **Pages**, enter the domain under **Custom domain**.
2. At the domain provider, add the DNS records GitHub shows in its [custom-domain documentation](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. Wait for DNS verification, then enable **Enforce HTTPS** in GitHub Pages.

DNS settings are owned by the domain provider, not by this project. Keep the GitHub Pages default URL working until the custom domain has been verified.
