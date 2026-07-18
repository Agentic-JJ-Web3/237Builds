# 237Builds

Welcome to 237Builds, a platform dedicated to showcasing and discovering amazing tech solutions built in Cameroon. This project aims to connect Cameroonian innovators with the local community, promoting homegrown talent and solving real-world problems in various sectors.

![237Builds Screenshot](/public/Capture.PNG)

## About the Project

237Builds is a web application that allows users to:

- Discover Cameroonian startups and tech solutions.
- Filter solutions by categories such as health, education, agriculture, transport, fintech, and e-commerce.
- Search for specific startups, solutions, or problems.
- Learn more about each startup, including their location, start date, and a brief description.
- Visit the startup's website for more information.

The project is built with HTML, Tailwind CSS, and vanilla JavaScript. It's designed to be a community-driven platform where developers can contribute and help grow the ecosystem of Cameroonian tech.

Tailwind is compiled ahead of time into `public/tailwind.css` (no CDN, no runtime framework) — the built file is committed, so you don't need Node.js just to view the site.

**Live Website:** [237-builds.netlify.app](https://237-builds.netlify.app)

## Getting Started

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Agentic-JJ-Web3/237Builds.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd 237Builds
   ```
3. **Open `index.html` in your browser:**
   You can simply open the `index.html` file in your favorite web browser to see the application in action.

### Editing styles (Tailwind classes)

If you add or change Tailwind classes in `index.html` or `script.js`, rebuild `public/tailwind.css` so your changes actually show up:

```sh
npm install
npm run build:css     # one-off minified build
# or
npm run watch:css     # rebuilds automatically while you edit
```

Commit the regenerated `public/tailwind.css` along with your other changes — it's the file the live site actually loads.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated** — including adding your own startup to the directory.

See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, how to add a new startup, and the pull request workflow.

Don't forget to give the project a star! Thanks again!

## License

This project is licensed under the MIT License. 