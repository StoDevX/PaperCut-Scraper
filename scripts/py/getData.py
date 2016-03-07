#!/usr/bin/env python

from urllib2 import urlopen
from bs4 import BeautifulSoup
import string, os, platform, time, json, re, unicodedata, HTMLParser, csv

# Papercut url
url = "https://papercut.stolaf.edu/environment/dashboard/"
# What our inFile is named
inFile = "./data/campus.csv"
# What our outFile will be named
outFile = "./data/data.json"


# Our constructed JSON data
responseData = []
# Parser to clean up the string names
h = HTMLParser.HTMLParser()
# Time when we started the script
start = time.time()

def appendData( login, week, month ):
	responseData.append( {'login':login,'week':week,'month':month} )


# Finds the cafeteria id and name
def getPaperCutData( url, login ):
	# Construct the full url
	url2 = ''.join( [ url, str( login ) ] )

	# Receive the content of url and convert it to a string
	response  = urlopen( url2 )
	data 	  = str( response.read() )

	try:
		# user html variables
		soup 	  = BeautifulSoup(data, 'html.parser')
		userStats = soup.find_all( "div", class_="user-stats-value" )
		envStats  = soup.find_all( "div", class_="env-stats-text" )

		# user personal use
		week 	  = userStats[ 0 ].text
		month 	  = userStats[ 1 ].text
		costMonth = userStats[ 2 ].text

		# Package off the user's data
		appendData( login, week, month )

	except:
		pass


# Round numbers to a decimal point
def num2str( num, precision ):
	return "%0.*f" % ( precision, num )

# Get the outFile's size
def calculateFileSize():
	fileSize = os.path.getsize( outFile )
	fileSize = str( fileSize )
	return fileSize

# Read in a CSV
def csv_reader( file_obj ):
	reader = csv.reader( file_obj )
	for row in reader:
		login = ( " ".join( row ) )
		getPaperCutData( url, login )

# Loop through the list of students
if __name__ == "__main__":
	csv_path = inFile
	with open( csv_path, "rb" ) as f_obj:
		# Read a login from the CSV
		csv_reader( f_obj )

# Write our output to a file
with open( outFile, 'w' ) as outfile:
	 # Output the data into a file
	json.dump( responseData, outfile )

	# Detect Mac OS for script end sound
	if platform.system() == "Darwin":
		# Play a sound to alert that we have finished
		os.system( 'afplay /System/Library/Sounds/Glass.aiff' )

	# Save the runtime
	endTime = time.time() - start;

print ( 'File: '     + outFile )
print ( 'Size: '     + calculateFileSize()   + ' bytes' )
print ( 'This took ' + num2str( endTime, 2 ) + ' seconds\n' )

