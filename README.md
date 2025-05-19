# PokéVerse
PokéVerse is a comprehensive pokemon information web app. In this app, the user can search for any pokemon and find information about them like their stats, typing, moves, and evolutions. The app also allows users to add pokemon using the Supabase database. The frontend was deployed on Vercel and the backend was deployed on Render with the Supabase database connection.

## Target Browsers:
### Desktop Browsers:
- Google Chrome
- Firefox
- Microsoft Edge
- Safari (macOS users)

### Mobile Browsers
- Safari (iOS 13 and above)
- Chrome (Android 10 and above)
- Firefox (Android 10 and above)

### Developer Manual
- Keep scrolling to find Developer manual part 1 and 2


# Getting Started with Create React App/ Dev manual pt.1

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

for this specific project, you will have to 

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Developer Manual pt.2

## Technologies used:
- Frontend: React, Axios, CSS, Vercel
- Backend: Node.js, express, supabase, Render
- Database: Supabase
- API Testing: Insomnia
- Environment: .env

## Pre-requisites:
- node.js v18 or higher
- NPM v9 or higher
- Github account
- Supabase account
- Render account
- Vercel account

## Structure and Start up:
There are 2 folders in the root folder: frontend and backend\
### Backend Startup
To start the backend, you will have to type this int your terminal: "node server.js" if everything goes to plan, the terminal should reply with "Server running on http://localhost:5000"\

If you make any changes to server.js, you will have to reenter this into you terminal to restart the server
### Frontend Startup
To start the frontend, you will have to run this in your terminal when in the frontend directory: "npm start"

## installations (step by step)
### main:
clone the repository if you haven't

### Backend:
1. change directory to backend folder
2. run npm install after changing directory
3. Create and .env file in the backend folder
4. in the .env implement these lines of code
    - SUPABASE_URL=https://your-supabase-url.supabase.co
    - SUPABASE_KEY=your-service-role-key
    - PORT = 5000

### Frontend: 
1. change directory to frontend folder
2. run npm install after changing directory
3. create .env file in the frontend folder
4. in the .env file implement this line of code
    - REACT_APP_API_URL=http://localhost:5000/api

## Running
### Backend:
1. change directory to backend folder
2. then run this in terminal: node server.js
3. It should come out to say "Server running on http://localhost:5000"
### Frontend: 
1. change the directory to backend folder
2. then run this in the terminal: npm start
3. It should start running on localhost:3000 without compilation errors

## Testing
There has been no testing yet for this specific version of PokeVerse.\
In the future, it would be nice to see the implementation of React Testing library for API testing.

## API for server application Documentation
1. GET /api/pokemon : gets all pokemon data in the Supabase database that we have created
2. POST /api/pokemon : adds new entry for pokemon into the Supabase database
3. PATCH /api/pokemon/:id updates pokemon entry information
4. DELETE /api/pokemon/:id deletes a pokemon entry by pokemon id

## Bugs and issues
1. 403 Forbidden Error: This will happen when the API key for supabase database is not configured correctly
2. Image not found: sometimes when searching up a pokemon, the image will not show for the pokemon, it comes back after an unknown amount of time
3. Testing: there has not been extensive testing on this web app, could be implemented for future testing
4. Database: if the database structure is messed around, it will mess up the database functions. Ensure that when updating backend and frontend code, to keep database functions in mind.

## Future Roadmap
### Here are some items I see for implementation in future development:
1. User authentication: use Supabase authentication features for user management
2. Filtering: Add a filtering feature in the search function when searching up pokemon
3. Testing: Add testing to ensure that API endpoints and frontend components are working well.
4. Error handling: make messages that would be good for users to understand what happened in the web app
5. Database: make a different database that adds all user searches to the database for less API usage.
6. Comparison: add a feature that allows pokemon to be compared to one another on a screen
7. Add a battle simulator: simulate battles using the data of pokemon
8. Implement a team builder like the one from pikalytics.com






