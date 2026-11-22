# Full Tank
## Project Overiew
- This project is a fuelling tracking app which has the following features: JWT Authentication, fully responsive design, data storage in a MySQL database, and fuelling statistics including visualizations.
- Tech Stack
  - Frontend: React.js and Tailwind CSS
  - Backend: FastAPI and MySQL
## Setup
- For this project you will need Docker Desktop to run the backend server and to store data into a MYSQL database
  - To download Docker Desktop, use the following link: https://www.docker.com/products/docker-desktop/
- For this project you will need to create a .env file once you have cloned/downloaded the project
  ### .env
  1) Create a file called .env inside the project at the root level.
  2) Then open the file inside an editor of your choice and copy the below into the file
      ```
      JWT_SECRET_KEY=***********
      MYSQL_ROOT_PASSWORD=*********
      DATABASE_URL=mysql+pymysql://root:********@mysql:3306/fullTank
      ```
  3) Replace the asterisks in the file by following the steps below
    - JWT_SECRET_KEY: For this environment variable you can pick any string you want which is at least 32 bytes, to randomly generate a string you can run the command below
       ```
        python -c "import secrets; print(secrets.token_hex(32))"
        ```
    - MY_SQL_ROOT_PASSWORD: For this environment variable, pick any password you want and replace the asterisks
    - DATABASE_URL: For this environment variable, replace the asterisks with the password you used for the MY_SQL_ROOT_PASSWORD variable
    - Example: Your .env file should look like something below, I will use the python command to generate the JWT_SECRET_KEY value, and select the password for MY_SQL_ROOT_PASSWORD as password123
      ```
      JWT_SECRET_KEY=793ce134812faebd3ab5f8c0df97a0d8f1ae26bebeae8b3b42eb96c1b1f9f98d
      MYSQL_ROOT_PASSWORD=password123
      DATABASE_URL=mysql+pymysql://root:password123@mysql:3306/fullTank
      ```

## Running the Program
  1. Open a new terminal window after opening the project in VSCode
  2. Running the Backend Server
        - Open the Docker Desktop application on your computer to allow Docker to create and start the containers
        - To run the backend with Docker, run the command below in your terminal  
          ```
          docker compose up --build -d  
          ```
   3. Running the Frontend server
      - Open a new terminal window and change into the frontend sub-directory using the command below
         ```
          cd frontend
         ```
      - Then to run the frontend server, run the command below
         ```
          npm run dev
         ```
  7. To view the website and interact with it open a new browser window and type in localhost:5173
     
## Stopping the Servers and Cleanup
  ### Backend
  - Docker Commands 
    - To stop the Docker containers and retain the data stored in the database, use the command below
      ```
      docker compose down
      ```
    - To stop the Docker containers and delete the data stored in the database, use the command below
      ```
      docker compose down -v
      ```
  - Command Line Commands
    - To stop the backend server running on the command line, type Ctrl C or Cmd C in the terminal window running the backend
  ### Frontend
  - To stop the frontend server, type Ctrl C or Cmd C in the terminal window running the frontend
