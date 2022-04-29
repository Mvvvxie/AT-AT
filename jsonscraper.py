import twint as t

# Importing the Twint library in order to access its features

c = t.Config()

# Defining a variable that will be responsible for taking in
# configuration parameters for the webscraping

c.Search = "fuck you"
c.Limit = 15
c.Store_json = True
c.Output = "tweets.json"

# The code above will vary depending on what search parameters the user
# is interested in. In this case, the code looks for the last 15 tweets
# containing the words "fuck you", then it proceeds to create the "tweets.json"
# and save the output inside it as an array of objects.


twint.run.Search(c)
# Executing the webscraping process
