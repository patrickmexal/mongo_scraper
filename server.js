// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Scraping Dependencies
var cheerio = require("cheerio");
var request = require("request");
// Initialize Express
var app = express();
// Database configuration
var databaseUrl = "arizonaSports";
var collections = ["sportsNews"];

// First, tell the console what server.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from Arizona Sports" +
            "\n******************************************\n");

// Making a request for arizonasports.com homepage
  request("https://www.arizonasports.com/", function(error, response, html) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(html);

  // Blank array to save our scraped data
  var results = [];

  // With cheerio, find each list item that is a link.
  $("li a").each(function(i, element) {

    // Save the text of the h4-tag as "title"
    var title = $(element).text();

    // Find the link tag's parent a-tag, and save it's href value as "link"
    var link = $(element).parent().attr("href");

    // Make an object with data we scraped push to results array
    results.push({
      title: title,
      link: link
    });
  });

  // After looping through each li log the results
  console.log(results);
});
