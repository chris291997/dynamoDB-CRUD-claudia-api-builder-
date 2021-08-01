/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	api = new ApiBuilder(),
	dynamoDb = new AWS.DynamoDB.DocumentClient();
  const fetch = require("node-fetch");
  const uuidv4 = require('uuid/v4');

    module.exports = api;

//! INSERT
    api.post('/dynasors', function (request) {
        var params = {
          TableName: 'dynasorDb',
          Item: {
                  id: uuidv4(),
                  createdAt: Date.now(),
                  updatedAt: Date.now(),
                  name: request.body.name,
                  species: request.body.species,
                  extinct_years: request.body.extinct_years,
                  description: request.body.description,
                  max_weight: request.body.max_weight
          }
          }
          console.log(params);
        return dynamoDb.put(params).promise();
      }, { success: 201, message: 'Success'});
      
  
      api.get('/dynasors', function (request) { // GET all users
        return dynamoDb.scan({ TableName: 'dynasorDb' }).promise()
            .then(response => response.Items)
      });


//! GET / FETCH ITEM
      api.get('/dynasors/{id}', function (request) {
        var id, params;
      
        id = decodeURI(request.pathParams.id);
        params = {
          TableName: 'dynasorDb',
          Key: {
            id: id
          }
        };
      
        return dynamoDb.get(params).promise().then(function (response) {
          return response.Item;
        });
      });

//! UPDATE
      api.put('/dynasors/{id}', function (request) {
        var id, params;
      
        id = decodeURI(request.pathParams.id);
        params = {
          TableName: 'dynasorDb',
          Item: {
            id: id,
            ...request.body
          }
        };
      
        return dynamoDb.put(params).promise()
          .then(function () {
            return 'Dyna record Updated: "' + id + '"';
          });
      }, {success: { contentType: 'text/plain'}});


//! DELETE
      api.delete('/dynasors/{id}', function (request) {
        var id, params;
      
        id = decodeURI(request.pathParams.id);
        params = {
          TableName: 'dynasorDb',
          Key: {
            id: id
          }
        };
      
        return dynamoDb.delete(params).promise()
          .then(function () {
            return 'Dyna record Deleted : "' + id + '"';
          });
      }, {success: { contentType: 'text/plain'}});


//! SCAN

    api.get('/dynasors', function (request) { // GET all users
      return dynamoDb.scan({ TableName: 'dynasorDb' }).promise()
          .then(response => response.Items)
    });


    