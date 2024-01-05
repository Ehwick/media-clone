# media-clone

This project utilized React on the frontend along with Express JS on Node JS runtime, and a MongoDB server on the backend to conditionally render a social media clone onto a single page app. Material-UI was used for the design and Redux Toolkit was used to facilitate the state management of the project. 

The backend server is entered through its own index.js file, where we have important middleware configurations set up, such as helmet, morgan, and the cors policy, as well as our openings to our routes, and our mongo DB server. Our routes handle our API logic with our frontend, especially by way of our middleware JSON webtoken handling, and our controller functions. 

The frontend is organized by scenes: specifically, the three main ones are our login/register page, home page, and profile page. These pages are essentially assemblages of various components, such as our navbar, user widget, post streams widget, and so on. Different scenes and widgets will render different pieces of information courtesy of our state management system, and API calls that handle information display and navigation. 

## LOGIN / REGISTER PAGE:

i. Login form created with Formik
![login form](/public/assets/login.png)

ii. Register form with Formik, and multer
![top of register form](/public/assets/register1.png)

iii. Bottom part of register form 
![bottom part of register form](/public/assets/register2.png)


