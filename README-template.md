# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

### Screenshot

![](./screenshot.jpg)




Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

### Links

- Solution URL: [Add solution URL here](https://github.com/MoatazAhmad/URL-shortening-landing-page)
- Live Site URL: [Add live site URL here](https://moatazahmad.github.io/URL-shortening-landing-page/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JavaScript (ES6+)
- LocalStorage for data persistence
- Fetch API for making HTTP requests
- Node.js with Express for the backend (very simple)
- GitHub Pages for frontend deployment
- Cercel for backend deployment



### What I learned and did

#### **HTML & Accessibility**
- Structured the project using semantic HTML5 elements like `<header>`, `<section>`, and `<footer>` for better readability and accessibility.
- Used descriptive `alt` attributes for images and meaningful link text to improve accessibility.
- Ensured the layout is responsive and works well across various devices.

#### **CSS & Responsive Design**
- Utilized **CSS custom properties** to maintain consistent styling and improve maintainability.
- Leveraged **Flexbox** to create a responsive and visually appealing layout.
- Followed a **mobile-first workflow**, ensuring the design is optimized for smaller screens before scaling up.
- Added smooth **transitions** and animations to enhance the user experience, such as fade-in effects for dynamically added elements.

#### **JavaScript & DOM Manipulation**
- Improved my understanding of **JavaScript ES6+** features, including `async/await`, template literals, and arrow functions.
- Dynamically created and manipulated DOM elements using `document.createElement` and `innerHTML`.
- Implemented real-time validation for the input field, providing immediate feedback to users.
- Added functionality to copy shortened URLs to the clipboard and delete items from the UI.

#### **LocalStorage for Data Persistence**
- Used `localStorage` to persist user data (shortened URLs) across browser sessions.
- Learned how to retrieve, update, and delete items from `localStorage` to ensure the app remains functional after a page refresh.

#### **Fetch API & Backend Integration**
- Gained experience using the **Fetch API** to make HTTP POST requests to a backend server for URL shortening.
- To overcome CORS restrictions when calling the CleanURI endpoint directly from the browser, I architected a lightweight Node.js + Express proxy service. This backend securely forwards the client’s URL shortening requests to CleanURI and returns the resulting short links to the frontend, preserving my app’s seamless user experience

#### **Frontend-Backend Communication**
- Successfully connected the frontend and backend by deploying the frontend to **GitHub Pages** and the backend to **Vercel**.
- Handled error scenarios gracefully, such as displaying error messages when the input field is empty or when the server returns an error.

#### **User Experience Enhancements**
- Added smooth animations for adding and removing elements in the UI, making the app feel more interactive and polished.
- Implemented a delete button (`X`) for each shortened URL, allowing users to remove items from both the UI and `localStorage`.
- Ensured the app provides clear feedback to users, such as confirmation messages for deletions and success messages for copying URLs.



## Author

- Githup - [Moataz Ahmad](https://github.com/MoatazAhmad)
- Frontend Mentor - [@MoatazAhmad](https://www.frontendmentor.io/profile/MoatazAhmad)
