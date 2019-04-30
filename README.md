# React Project: Trip Planner

**Team members:** Stanley Huang, Alex Cui

**Demo Link:**

**Prompt:** Make your own

## Abstract 
Our project is a trip planner that allows the user to search points of interest in their destination using the Yelp Fusion API and add those points of interest as events on a calender of days. This project was made entirely in React, with help from Yelp API, the Semantic UI React npm package, and the react-router package. 

## Component
* **Planner:** Top level component. Switches views from the StartMenu to the Calender/Search using React Router

* **StartMenu:** Represents the Start Menu. Simply has a form for user input for date range and location. Saves results to state.

* **Search:** Represents the "Search Panel" on the right. This is where the Yelp API Calls are made and processed as result cards below.
* **SearchResultCard:** Represents a single search result card that shows basic information about a specific business. Contains a form that allows for the user to add that business to their calender.
* **Calendar:** Respresents the calendar left panel of the trip planner. Takes the selections from the search panel and renders them under the appriopriate date.
* **DayCard:** Represents each day section of the Calendar
* **EventCard:** Represents each event in the DayCard
* **BusinessDetail:** Content that shows up when EventCard is clicked. Calls an api endpoint that gives more details for the business.

## Features
* Users can look up businesses based on search terms and our app spits out the top 20 results. For each result, we give basic information about the business, its rating and a photo.
* Users can add each business to the calendar on the left for a specific date to scheduale their trip.

## Division of Labor
* Stanley: Planner, Search, SearchResultCard, StartMenu
* Alex: Calendar, DayCard, EventCard, BusinessDetail