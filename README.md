**Weather Application**

This is a React-based weather application that provides weather updates based on the current location and user input for city names. It supports light and dark themes, offers a responsive design, and includes features like loaders, toasts, and formatted date displays.

**Instructions on how to run the application locally.**
1. Clone repo to run locally 
2. Install dependencies **npm install** and start the application with **npm start** command in terminal 
3.The application will automatically open in your default web browser. If it doesn't, you can manually open your browser and go to http://localhost:3000.

**Approch:**

**1. Creating the Application:**
The project was initialized using npx create-react-app to set up the necessary environment, including node-modules and other configurations for a React application.   
**2. Component Structure:**
A components folder was created to house the various components of the application.
Created required files for both components (Home.jsx) and styles (Home.css).

**3.Functional Components:**
Built functional components and implemented the application logic within them.
Exported these components for further use.

**4. State Management:**
Used the useState hook to maintain the local state.
Used the useEffect hook to call the weather API.

**5. Responsiveness:**
Employed CSS media queries and flexbox for responsive design.

**6. Themes:**
Implemented light and dark themes that change dynamically based on user actions.

**7. API Integration:**
Used an open-source weather API to fetch weather data based on the current location and user-provided city names.

**8. Component Integration:**

Imported all components into App.js to assemble the complete application.

**Technologies:**
HTML, CSS, Javascript, React Js, API integration 
Others:
 Loader - When API response in pending stage, 
 Toast - To  show Api status message like alert 
Moment - To show date as required format
