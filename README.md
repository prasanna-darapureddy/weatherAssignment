**Weather Application**

**Instructions on how to run the application locally.**
1. Clone repo to run locally 
2. Start the application with npm start command in any code application terminal 
3. The application will open in your browser 

**Approch:**
1. I created a react application with the command  npx create react app to get all necessary environments like node-modules, app setup for creating a react application.
2. I created a components folder where I can create components for the app 
3. Created required files for both components (Home.jsx) and style(Home.css)
4. I build functional components then I implemented logic there and exported those components for further use.
5.  To maintain the local state I used useState hook and to call API  used useEffect hook
6. For responsiveness CSS media queries and flex are used. 
7. Implemented light and dark theme based on user actions dynamically 
8. Used open source weather API for data, based on current location and user given input as city name the weather report will be displayed.
9.  Imported all components into the App.js to form components to the whole application

**Technologies:**
HTML, CSS, Javascript, React Js, API integration 
Others:
 Loader - When API response in pending stage, 
 Toast - To  show Api status message like alert 
Moment - To show date as required format
