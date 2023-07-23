# Getting Started with Create React App

Getting Started
Follow the steps below to run the Quiz App on your local machine:

Clone the Repository:

git clone https://github.com/nithinvukkusila/Quiz-app
Install Dependencies:

Navigate to the project directory and run the following command to install the required dependencies:


**cd quiz-app
npm install 
**

Start the Development Server:

Run the following command to start the development server:

npm start
This will launch the Quiz App in your default web browser at http://localhost:3000.

npm run mock:api 
This will run the json-server mock api 

Using the Quiz App
Home Page:

The Quiz App home page displays a welcome message and a "Start" button. Click the "Start" button to begin the quiz.

Quiz Page:

The quiz page displays one question at a time. Each question consists of a text and an optional image. Select one option by clicking the corresponding radio button and then click the "Next" button to move to the next question.


Report Page:

After answering all the questions, the app will automatically navigate to the report page. The report page displays the following details:

Total Score: The total score obtained based on the correct answers.

Correct Answers: The number of questions answered correctly.

Incorrect Answers: The number of questions answered incorrectly.

Percentage: The percentage of correct answers out of the total questions.
Start Again:

To take the quiz again, click the "Start Again" button on the report page. This will redirect you to the home page to start a new quiz.


API Endpoints
The Quiz App uses json-server to provide API endpoints for questions and submitting user responses.

Get Questions:

URL: http://localhost:4000/questions
Request Type: GET
Response: Returns an array of quiz questions in JSON format.
Submit Response:

URL: http://localhost:4000/submit-response
Request Type: POST
Request Body: Expects a JSON object with the following properties:
questionId: The ID of the answered question.
selectedChoice: The selected choice as the answer.
timeTaken: The time taken to answer the question.
Response: Returns a success status code if the response is submitted successfully.
