# Full Tank
## Project Overiew
- This project is a fuelling tracking app which has the following features: JWT Authentication, fully responsive design, data storage in a MySQL database, and fuelling statistics including visualization.
- Tech Stack
  - Frontend: React.js and Tailwind CSS
  - Backend: FastAPI and MySQL
## Setup
- For this project you will need to create a .env file once you have cloned/downloaded the project
  requests
  ### .env
  1) First if you don't have a MongoDB account you will need to create one. You can do so at this link [MongoDB Sign Up/Sign In](https://www.mongodb.com/cloud/atlas/register)
  2) Once you create your account/login, create a new project by using the dropdown at the top left
  3) Then select the cluster option and create a new cluster. In the cluster options select the free tier and unselect the preload sample dataset option if autoselected
  4) On the Set up connection page press on the Create Database User button, then press on the Choose Connection Method button at the bottom right
  5) Then select on drivers and make sure Node.js is selected and at the bottom copy the connection string with the show password option enabled
     under the Add your connection string into your application code section
  6) Then open the project in VSCode and inside the backend folder create a .env file. Then inside the .env file copy the code below and replace the MONGO_URI
     with the string you copied in the previous step
      ```
      MONGO_URI= copied connection string
      PORT= 5001
      ```
  7) Finally go under the Network Access options on the options on the left and select the Add IP Address option and then select the Allow Access From Anywhere option
     and confirm

## Running the Program:
  1. First open a new terminal window after opening the project in VSCode
  2. Change from the root directory into the intro_project directory if necessary or stay in the quick_note directory
      ```
      cd quick_note // to change into the quick_note directory if necessary
      ```
  3. Installing the dependencies
     - To install all the dependencies which will allow the project to work correctly run the command below in the terminal
       ```
        npm run build
       ```
  4. Run the backend server
     - First change into the backend directory using the command below
       ```
        cd backend
       ```
      - Then to run the backend server run the command below
         ```
          npm run dev
         ```
   5. Run the frontend server
     - Open a new terminal window and change into the quick_note directory if necessary
     - Then change into the frontend directory using the command below
       ```
        cd backend
       ```
      - Then to run the frontend run the command below
         ```
          npm run dev
         ```
  7. To view the website and interact with it open a new browser window and type in localhost:5173
  8. To check the data is being saved you can check the MongoDB cluster you created and also can check the upstash database to make sure the rate limiter is working correctly.
