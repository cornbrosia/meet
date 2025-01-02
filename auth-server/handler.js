'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://cornbrosia.github.io/meet/"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// Common CORS Headers
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': true,
};

// Handle OPTIONS Preflight Requests
const handleOptions = () => ({
  statusCode: 200,
  headers: CORS_HEADERS,
  body: '',
});

const verifyAuthHeader = (event) => {
  const authHeader = event.headers?.Authorization || event.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing or invalid Authorization header");
  }

  return authHeader.split(" ")[1]; // Extract the token after "Bearer"
};

module.exports.getAuthURL = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return handleOptions();
  }

  try {
    const authToken = verifyAuthHeader(event); // Validate Authorization header
    console.log("Authorization Token:", authToken);

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ authUrl }),
    };
  } catch (error) {
    return {
      statusCode: 401,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports.getAccessToken = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return handleOptions();
  }

  try {
    const authToken = verifyAuthHeader(event); // Validate Authorization header
    console.log("Authorization Token:", authToken);

    const code = decodeURIComponent(`${event.pathParameters.code}`);

    return new Promise((resolve, reject) => {
      oAuth2Client.getToken(code, (error, response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response);
      });
    })
      .then((results) => ({
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify(results),
      }))
      .catch((error) => ({
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify(error),
      }));
  } catch (error) {
    return {
      statusCode: 401,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports.getCalenderEvents = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return handleOptions();
  }

  try {
    const authToken = verifyAuthHeader(event); // Validate Authorization header
    console.log("Authorization Token:", authToken);

    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
    oAuth2Client.setCredentials({ access_token });

    return new Promise((resolve, reject) => {
      calendar.events.list(
        {
          calendarId: CALENDAR_ID,
          auth: oAuth2Client,
          timeMin: new Date().toISOString(),
          singleEvents: true,
          orderBy: "startTime",
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    })
      .then((results) => ({
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ events: results.data.items }),
      }))
      .catch((error) => ({
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify(error),
      }));
  } catch (error) {
    return {
      statusCode: 401,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
