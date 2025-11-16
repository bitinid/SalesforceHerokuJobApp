📄 README – Salesforce Job Application App (React + Node.js + Heroku)

🚀 Overview

This project is a full-stack application that allows job applicants to submit job applications through a React web form.
The backend (Node.js + Express) handles:

Authenticating to Salesforce using OAuth 2.0 Password Grant

Storing sensitive credentials securely using Heroku Config Vars

Sending form data to a custom Salesforce Apex REST API

The frontend (React) provides a simple job application form and communicates only with the backend.

The entire project is designed to be easily deployed on Heroku.


⚙️ Backend (Node.js + Express)


Retrieves an OAuth access token from Salesforce

Forwards job application data to the Salesforce Apex REST API

Returns the result to the React client

Serves the built React frontend when deployed on Heroku

Run Backend Locally
npm install
cd client
npm install
cd ..
npm start


Backend starts on http://localhost:5000.

🧩 Frontend (React)


Simple job application form:

First Name
Last Name
Email (validated)
Phone
Resume (text area)


🔐 Environment Variables (Heroku)

The requires the following Salesforce credentials, stored safely in Heroku Config Vars:

Variable	Description

SF_CLIENT_ID : 	Salesforce Connected App Client ID
SF_CLIENT_SECRET : 	Connected App Secret
SF_USERNAME : 	Salesforce login email
SF_PASSWORD : 	Salesforce login password
SF_SECURITY_TOKEN : 	Salesforce security token
SF_API_URL : 	Full URL of the Apex REST API endpoint

Set variables on Heroku:

heroku config:set \
SF_CLIENT_ID=xxx \
SF_CLIENT_SECRET=xxx \
SF_USERNAME=xxx \
SF_PASSWORD=xxx \
SF_SECURITY_TOKEN=xxx \
SF_API_URL=https://yourInstance.salesforce.com/services/apexrest/jobApplications/


☁️ Deployment on Heroku

1. Create the Heroku app


2. Push the project
git add .
git commit -m "Deploy application"
git push heroku main

3. Heroku Build Pipeline

Heroku will automatically:

Install backend dependencies

Run heroku-postbuild to install + build React

Serve the React build via Express

🧪 Testing the API

Submit a job application via API:
POST /api/submit
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@email.com",
  "phone": "555-123-4567",
  "resume": "My experience..."
}


Expected response:

{
  "success": true,
  "applicationId": "JA-00123"
}


Common issues:

Missing environment variables

Incorrect Salesforce credentials

Wrong Apex REST URL

🚫 Salesforce token request fails

Check:

Connected App → OAuth → Password Flow is enabled

User has API permissions

Security Token is valid

Login URL uses login.salesforce.com (not test unless using sandbox)

📜 License

This project may be used freely for testing, demo, or integration with Salesforce.
