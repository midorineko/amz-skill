/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Room Hub for a steven fact"
 *  Alexa: "Here's your steven fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.0c343318-1f7c-4dfb-8262-c3b7b4aff89b"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var STEVEN_FACTS = [
    // "Steven is a robot cat.",
    // "Steven Loves to program.",
    // "Steven doesnt like to go to the movies without alcohol.",
    "Welcome, to Steven's room. Would you like a drink?",
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * StevenFact and eventually RoomHub is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var StevenFact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
StevenFact.prototype = Object.create(AlexaSkill.prototype);
StevenFact.prototype.constructor = StevenFact;

StevenFact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("StevenFact onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

StevenFact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("StevenFact onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
StevenFact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("StevenFact onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

StevenFact.prototype.intentHandlers = {
    GetNewFactIntent: function (intent, session, response) {
        console.log("StevenFact new fact response: " + response);
        handleNewFactRequest(response);
    },

    HelpIntent: function (intent, session, response) {
        response.ask("Steven Fact is here as a preliminary to room hub");
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * STEVEN_FACTS.length);
    var fact = STEVEN_FACTS[0];
    // var fact = STEVEN_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your space fact: " + fact;

    response.tellWithCard(speechOutput, "StevenFact", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var stevenFact = new StevenFact();
    stevenFact.execute(event, context);
};

