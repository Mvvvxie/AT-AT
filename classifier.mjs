'use strict';

// Importing the toxicity pre-trained model from the
// tensorflow.js library along with the fs module which
// helps with file system interaction

import * as toxicity from '@tensorflow-models/toxicity'
import { readFile } from 'fs';

// Reading the JSON file containing the tweets
// database acquired with jsonscraper.py
// and saving storing it inside the jsonString
// parameter. It uses fs library, which enables
// file interaction within Java Script

readFile('./tweets.json', 'utf-8', (err, jsonString) =>{

    // Before the main body of the code takes action and
    // starts the text classification process, it is wrapped
    // in a try and catch statement. The try statement
    // allows the user to define a block of code to be tested
    // for errors while it is being executed, while the catch
    // statement allows the user to define a block of code to be
    // executed, if an error occurs in the try block.
    
    if (err) {
        console.log(err);
    } else {
        try {
            
            // Defining the data variable which will store
            // the parsed data withing jsonString

            const data = JSON.parse(jsonString);

            // Set the threshold which will be a defiding factor
            // whether a tweet receives a flag or not.

            const threshold = 0.7;

            // Load the imported pre-trained toxicity model and
            // execute it while taking the defined threshold into account

            toxicity.load(threshold).then(model => {

                // A loop that does the following operation util the
                // criteria are met. In this case, for every
                // tweet inside the scraped file, perform text
                // classification on the tweet.

                for (var i = 0; i < data.length - 1; i++) {
                  
                  // As the file the code is reading is an array of objects,
                  // the variable needs to be set as the object
                  // whose number in line corelates with the number of the
                  // current iteration, while only reading the value of
                  // the "tweet" object.

                  const tweets = [data[i].tweet];
                  // Perform text classification on the defined variable.

                  model.classify(tweets).then(predictions => {
                    
                      // Print the results.
                      console.dir(tweets, {depth: null});
                      console.dir(predictions, {depth: null});
                      
                  });
                  
                  };
            })}
         catch (err) {
            console.log('Error parsing JSON', err);
        }
    
    }})

    