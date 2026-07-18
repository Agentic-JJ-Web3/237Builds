# Contributing to 237Builds

Thanks for wanting to help grow 237Builds! This is a small static site (HTML + vanilla JS + a JSON data file), so contributing doesn't require much setup.

## Ways to contribute

- **Add a startup to the directory** — see [Adding a New Startup](#adding-a-new-startup) below.
- **Fix a bug** — open an issue first if it's not obvious, or just send a PR.
- **Suggest a feature** — open an issue tagged `enhancement` to discuss before building something large.

## Local setup

```sh
git clone https://github.com/Agentic-JJ-Web3/237Builds.git
cd 237Builds
npm install
```

Then open `index.html` directly in your browser — there's no dev server or build step required just to view the site.

### If you change Tailwind classes

`index.html` and `script.js` styles are compiled ahead of time into `public/tailwind.css` (no CDN, no runtime framework). If you add or change any Tailwind classes, rebuild that file so your changes actually show up:

```sh
npm run build:css     # one-off minified build
# or
npm run watch:css     # rebuilds automatically while you edit
```

Commit the regenerated `public/tailwind.css` along with your other changes — it's the file the live site actually loads.

### If you change `data/companies.json`

Validate it against the schema before opening a PR:

```sh
npm run validate:data
```

This checks required fields, the allowed `category` values, URL shape, and duplicate `id`s. It also runs automatically in CI on every push and pull request (`.github/workflows/validate-data.yml`) — a failing check means the PR can't merge until it's fixed.

## Adding a New Startup

You can either:

- **Contact us:** send the startup details to [njeipierrick@gmail.com](mailto:njeipierrick@gmail.com) or reach out on social media, and we'll add it for you.
- **Contribute via GitHub:**
  1. Open `data/companies.json`.
  2. Add a new startup object to the JSON array, following the existing format:
     ```json
     {
         "id": 1,
         "name": "Your Startup Name",
         "category": "healthtech",
         "location": "City, Cameroon",
         "startDate": "YYYY",
         "description": "A brief description of your startup.",
         "website": "https://your-startup-website.com",
         "logo": "URL to your startup's logo"
     }
     ```
     - `id` must be unique among all entries.
     - `category` must be exactly one of: `community`, `healthtech`, `edtech`, `agritech`, `technology`, `transport`, `fintech`, `ecommerce` (lowercase, as spelled — enforced by `data/companies.schema.json`).
     - `website` must be a full `http(s)://` URL.
     - `logo` must be a full `http(s)://` URL, a site-relative path starting with `/`, or an empty string.
  3. **Uploading a logo:** if you don't have a URL for your startup's logo, upload it for free on [imgbb.com](https://imgbb.com), then use the direct image link (ending in `.png`, `.jpg`, or `.jpeg`) as the `logo` value.
  4. Run `npm run validate:data` and fix anything it flags.
  5. Open a pull request.

## Submitting a Pull Request

1. Fork the project.
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request describing what changed and why.

If your PR touches `data/companies.json`, make sure `npm run validate:data` passes locally — CI will block the merge otherwise.

Don't forget to give the project a star! Thanks for contributing.
