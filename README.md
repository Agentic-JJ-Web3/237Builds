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

**Live Website:** [237-builds.vercel.app](https://237-builds.vercel.app)

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

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Adding a New Startup

To add a new startup to the platform, you can either:

- **Contact us:** Send the startup details to [237builds@gmail.com](mailto:237builds@gmail.com) or reach out to us on our social media channels.
- **Contribute via GitHub:**
  1. Open the `data/companies.json` file.
  2. Add a new startup object to the JSON array, following the existing format:
     ```json
     {
         "id": 13, // Make sure to use a unique ID
         "name": "Your Startup Name",
         "category": "Your Category", // e.g., "health", "education", etc.
         "location": "City, Cameroon",
         "startDate": "YYYY",
         "description": "A brief description of your startup.",
         "website": "https://your-startup-website.com",
         "logo": "URL to your startup's logo"
     }
     ```
  3. **Uploading a Logo:** If you don't have a URL for your startup's logo, you can upload it for free on [imgbb.com](https://imgbb.com). After uploading, copy the direct link to the image (ensure it ends with `.png`, `.jpg`, or `.jpeg`) and use it as the `logo` value.
  4. Save your changes.
  5. Create a pull request with your changes.

## License

This project is licensed under the MIT License. 