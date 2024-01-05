# Media-clone

This project utilized React on the frontend along with Express JS on Node JS runtime, and a MongoDB server on the backend to conditionally render a social media clone onto a single page app. Material-UI was used for the design and Redux Toolkit was used to facilitate the state management of the project. 

The backend server is entered through its own index.js file, where we have important middleware configurations set up, such as helmet, morgan, and the cors policy, as well as our openings to our routes, and our mongo DB server. Our routes handle our API logic with our frontend, especially by way of our middleware JSON webtoken handling, and our controller functions. 

The frontend is organized by scenes: specifically, the three main ones are our login/register page, home page, and profile page. These pages are essentially assemblages of various components, such as our navbar, user widget, post streams widget, and so on. Different scenes and widgets will render different pieces of information courtesy of our state management system, and API calls that handle information display and navigation. 

## Login / register page:

i. Login form created with Formik
![login form](/public/assets/login.png)

ii. Register form with Formik, and multer
![top of register form](/public/assets/register1.png)

iii. Bottom part of register form 
![bottom part of register form](/public/assets/register2.png)

## Home page:

i. Home page with navbar at top, user widget to the left, post widget in the center middle with multer upload, a posts widget below it, and an advertisement widget and friends list widget to the right. 
![top of home page](/public/assets/homepage1.png)

ii. Home page demonstrating comments and like functionalities, and mapping of friends list widget 
![rest of home page](/public/assets/homepage2.png)

iii. Light mode of the homepage 
![homepage on light mode](/public/assets/homepageL.png)

### homepage with responsive design

i. When working with a smaller screen, the navbar is condensed to the logo and hamburger menu, and the user widget is at the top and takes up the whole screen
![responsive design nav with user widget](/public/assets/rhomepage1.png)

ii. Hamburger menu is toggled
![responsive design showing menu list](/public/assets/rhomepage2.png)

iii. Post and posts widgets are below the user widget for responsive design
![homepage on light mode](/public/assets/rhomepage3.png)

## Profile page:

i. Profile page renders the user widget, post widget, and posts widget of a given user
![Profile page of a different user](/public/assets/profilepage.png)

ii. When working with a small screen, user widget is up top 
![Responsive profile page](/public/assets/rprofilepage1.png)

iii. Friends list and post/posts widget would be below the user widget
![Bottom of responsive profile page](/public/assets/rprofilepage2.png)
