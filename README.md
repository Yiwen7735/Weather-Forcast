# Buddy Challenge: Build A Weather Forecast App

### Overview
Our Buddy Challenge consists of a very basic web app providing weather information for a selected number of cities. It displays the current weather for these cities and enables the user to filter through the data by specifying a city and a time, which will give the user the weather forecast according to their specifications.

### Code Layout
This app was built using Node.js and Express. The front-end consists of two EJS pages, index.ejs and filter-results.ejs. index.ejs is the home page that consists of a table with 10 different cities, their weather descriptions, their temperatures, and what those temperatures feel like. This page also contains a filter where the user can choose a city and a time of their liking and get the corresponding forecast. filter-results.ejs is the page that the user is redirected to after using the filter. It also contains a table with various points of information such as weather description, temperature, what the temperature feels like, etc. 

The back-end consists of a JS file, server.js, which loads all of our packages, sets up our Express framework, and contains our POST and GET calls to obtain our weather forecasts. 

