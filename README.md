# PaperCut Environmental Data Scraper

##### What is it?
This script fetches data provided by [PaperCut](https://papercut.stolaf.edu), St. Olaf College's printing service, and scrapes [each webpage](http://papercut.stolaf.edu/environment/dashboard/username) containing the environmental impact per user based upon a list of usernames provided. The generated JSON file is then visualized within a D3 graphic inside of a webpage.

##### Invariants:
1. The python script is dependent upon a list of usernames that is _not provided_ on this repository. It is a CSV and lives within the `data` folder.
     * The format consists of: username, a new line, zero or more usernames.
     * The file is at `data/campus.csv`. This file must exist.
2. You must have usernames within `data/campus.csv`.
3. You must have Python 2.7 installed.
4. You must have these libraries as well:
     * urlopen *and* BeautifulSoup
     * string, os, platform, time, json, re, unicodedata, HTMLParser, csv

##### Steps:
1. Satisfy the invariants above.
2. Run the data-scraping script located at `scripts/py/getData.py`.
     * `python scripts/py/getData.py`
     * *Have ~11 minutes worth of patience...*
     * *The data file is located at `data/data.JSON` in the case you would like to inspect it when it finishes.*
3. Open the `index.html` webpage in a local web browser to see the data visualized in a D3 graph.

##### Development
* Want to contribute? Great! We'd love to see what you can do. Show us what you got!
* We make use of D3, JavaScript, HTML, CSS, and Python for familiar web development.
