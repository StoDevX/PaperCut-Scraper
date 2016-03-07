#!/usr/bin/env python

from __future__ import print_function
from bs4 import BeautifulSoup
from urllib2 import urlopen
import time
import json
import os


# What our in_file is named
in_file = "./data/campus.csv"
# What our out_file will be named
out_file = "./data/data.json"


# Finds the cafeteria id and name
def get_papercut_data(login):
    # Construct the full url
    full_url = "http://papercut.stolaf.edu/environment/dashboard/" + str(login)

    # Receive the content of url and convert it to a string
    response = urlopen(full_url)
    data = str(response.read())

    try:
        # user html variables
        soup = BeautifulSoup(data, 'html.parser')
        user_stats = soup.find_all("div", class_="user-stats-value")
        env_stats = soup.find_all("div", class_="env-stats-text")

        # user personal use
        week = user_stats[0].text
        month = user_stats[1].text
        cost_month = user_stats[2].text

        # Package off the user's data
        return {'login': login, 'week': week, 'month': month}

    except:
        return None


# Loop through the list of students
def main():
    # Time when we started the script
    start = time.time()

    with open(in_file, "r") as input_data:
        # Read all usernames from the data file
        logins = input_data.read().splitlines()

    # Make sure that every line has text on it
    logins = [login for login in logins if login]

    # Collect the papercut data for each username
    response_data = [get_papercut_data(login) for login in logins]

    # Write our output to a file
    with open(out_file, 'w') as outfile:
        # Output the data into a file
        json.dump(response_data, outfile)

    # Calculate the time taken
    end_time = time.time() - start

    size = os.path.getsize(out_file)
    print('wrote {} bytes to {} in {:.2f} seconds'.format(size, out_file, end_time))

if __name__ == '__main__':
    main()
