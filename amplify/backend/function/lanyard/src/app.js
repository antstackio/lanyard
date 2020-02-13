/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
const AWS = require("aws-sdk")
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware")
var bodyParser = require("body-parser")
var express = require("express")

AWS.config.update({ region: process.env.TABLE_REGION })

const dynamodb = new AWS.DynamoDB.DocumentClient()

let tableName = "lanyard"
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV
}

const userIdPresent = false // TODO: update in case is required to use that definition
const path = "/items"
const UNAUTH = "UNAUTH"
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

/************************************
 * HTTP post method for insert object *
 *************************************/

app.post(path, function(req, res) {
  if (userIdPresent) {
    req.body["userId"] =
      req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body,
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500
      res.json({ error: err, url: req.url, body: req.body })
    } else {
      res.json({ success: "post call succeed!", url: req.url, data: data })
    }
  })
})

app.get(path, function(req, res) {
  const params = {
    TableName: tableName,
  }
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.statusCode = 500
      res.json({ error: err })
    } else {
      res.json({ status: 200, data: data.Items })
    }
  })
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
