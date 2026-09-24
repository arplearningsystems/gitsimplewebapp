# My Learning Notes

A small web app for learning the basic parts of a website:

- **HTML** (`index.html`) defines the page, form, and list of notes.
- **CSS** (`styles.css`) controls the visual layout and responsive styling.
- **JavaScript** (`app.js`) handles form submissions, validates text, displays notes, and saves them.

## How saved input works

When someone submits the form, JavaScript creates a note and stores the whole note list in the browser's [`localStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage). When the page loads again, JavaScript reads the same value and redraws the list.

This data is **only stored in the current browser on the current device**:

- Visitors cannot see each other's notes.
- Notes do not sync to another browser or device.
- Clearing this website's browser storage removes the notes.

For shared accounts, synchronized notes, or private server-side data, the next learning step would be a backend and database. Do not put secret keys in this static project.

## Run it locally

Open `index.html` in a browser. You can also use a local static server if you have Python installed:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Publish with GitHub Pages

1. Create a new empty repository on [GitHub](https://github.com/new), for example `my-learning-notes`.
2. In this project folder, initialize Git and push the files:

   ```bash
   git init
   git add index.html styles.css app.js README.md
   git commit -m "Create learning notes app"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/my-learning-notes.git
   git push -u origin main
   ```

3. On GitHub, open the repository’s **Settings** → **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/(root)` folder, then save.
6. GitHub will show the public URL, typically `https://YOUR-USERNAME.github.io/my-learning-notes/`.

Each future `git add`, `git commit`, and `git push` to `main` will update the deployed site.

## Add a custom domain later

After buying or using a domain from a domain provider:

1. In the GitHub repository’s **Settings** → **Pages**, enter the domain under **Custom domain**.
2. At the domain provider, add the DNS records GitHub shows in its [custom-domain documentation](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. Wait for DNS verification, then enable **Enforce HTTPS** in GitHub Pages.

DNS settings are owned by the domain provider, not by this project. Keep the GitHub Pages default URL working until the custom domain has been verified.
