# SurveyPilot
Simplify Polling and Survey Creation

## Technology
- Django
- ReactJS
- PostgreSQL

## Environment
- **Python**: `>= 3.8.10`
- **NodeJS**: `>= 16.20.2`


## Key Features

### User Authentication
Users should be able to register, log in, and log out.
Authenticated users can create and manage their own polls and surveys.

### Poll Creation
Users can create polls with multiple choice questions (text, image, audio, video).
Set an expiration date or limit for the poll if desired.

### Survey Creation
Users can create surveys with various question types (e.g., multiple choice, open-ended).
Surveys can be more flexible in terms of question types compared to polls.

### Voting/Responses
Users can vote in polls or submit responses to surveys.
Ensure that users can only vote once per poll or survey.

### Results Display
Show poll results in real-time as users vote.
Display survey responses and summaries.

### Admin Interface
Admins can manage polls and surveys, including moderating content and viewing statistics.

### Webhook
Webhooks allow users to automate actions by sending real-time data from SurveyPilot to external systems or services whenever a form is submitted. This feature is particularly useful for integrating with other tools, triggering custom workflows, or updating external databases.

### Integration
User can seamlessly embed polls and surveys from SurveyPilot into their own web pages or applications using a JavaScript plugin. This feature facilitates easy integration and enhances the visibility and accessibility of polls and surveys. User generate the JavaScript embed code through the SurveyPilot dashboard & copy-paste the code into the HTML of the target web page where the poll or survey should appear.
