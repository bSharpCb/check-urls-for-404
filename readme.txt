urlgrabber.js will accept a CSV (comma delimited) list of URLs, check the status code for each one, log the response + number of retries, and can (optionally) output a CSV results file

Running the script:

while in the URLgrabber directory (command line / terminal / etc)

node urlgrabber.js urlsToCheck.csv
//outputs to the command line

node urlgrabber.js urlsToCheck.csv resultsFile.csv
//will output to the command line, and then create a results file to store the results