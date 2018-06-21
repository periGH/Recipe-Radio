# 'requests' and 'bs4' modules must be downloaded to run this program.

import requests, bs4, re, json, random 

class OpenEatsScraper:

    urlSearch = 'http://www.openeats.org/recipe/ajaxulist/share/qgriffith/?page='
    urlRecipePageNumber = '1' # There are a total of 27 pages to scrape.
    urlBase = 'http://www.openeats.org/'
    linksToRecipes = []
    
    def getPageAsSoup(self, url):
        resp = requests.get(url)
        resp.raise_for_status()        

        return bs4.BeautifulSoup(resp.text, "html.parser")

    def findTitleOnPage(self, soup):
        s = soup.select('title')
        text = s[0].getText()
        capitalized = text.title()

        return capitalized
    
    def findTagsOnPage(self, soup):
        strings = list()
        s = soup.find(class_ = 'recipe-groups')

        for string in s.stripped_strings:
            strings.append(string)    

        return strings

    def findDirectionsOnPage(self, soup):
        s = soup.select('#recipe-directions') # If you want to retain the tags, just have this method return soup.select('...')
        text = s[0].getText()
        text = text.splitlines()[5:]

        return text

    def findCookTimeOnPage(self, soup):
        s = soup.select('#recipe-cook')
        strippedString = re.sub(r"\s{2,}", " ", s[0].getText())

        return strippedString.strip()

    def findIngredientsOnPage(self, soup):
        s = soup.select('div > div > div > div > div ul')
        rawText = s[2].getText()
        #strippedString = re.sub(r"\s{2,}", " ", rawText) # Removes all spaces in excess of 1.

        return s[2].getText()#strippedString.splitlines()

    def getRecipeLinks(self, soup): # This method must be called while scraper is on a search page.
        tagList = soup.select('h3 > a')
        linkList = []
        
        for item in tagList:
            linkList.append(item['href'])
            
        return linkList

    def findImageLinkOnPage(self, soup):
        s = soup.select('a')
        for item in s:
            word = item['href']

            if re.search(r'.JPG$', word, re.IGNORECASE):
                imgLink = word

            # Thanks to OpenEats' terrible formatting, sometimes images end in .jpeg:
            if re.search(r'.jpeg', word, re.IGNORECASE):
                imgLink = word
            
        return self.urlBase + imgLink
                
    def buildRecipeUrl(self, path):

        return str(self.urlBase + path[1:]) # Slice out the first '/'

    def getLinks(self):
        soup = self.getPageAsSoup(self.urlSearch + self.urlRecipePageNumber)
        pathList = self.getRecipeLinks(soup)

        for path in pathList:
            self.linksToRecipes.append(self.buildRecipeUrl(path))
            
        return self.linksToRecipes

    def writeJson(self, data):
        num = random.randint(0, 9999)
        filename = 'jsonOutput' + str(num) + '.json'
        jsonFile = json.dumps(data)
        fout = open(filename, 'w')
        fout.write(json.dumps(data, sort_keys=True))
        fout.close()

##############################################################################

scraper = OpenEatsScraper()
links = scraper.getLinks()
recipes = {} # Contains all recipes.

for link in links:
    recipe_id = random.randint(0, 9999) # Used as key for a single recipe object in recipes.
    recipe = {} # Contains a single recipe.
   
    page = scraper.getPageAsSoup(link)

    # Load items into a dictionary:
    recipe['title'] = scraper.findTitleOnPage(page)[10:]
    recipe['image'] = scraper.findImageLinkOnPage(page)
    recipe['cooktime'] = scraper.findCookTimeOnPage(page)
    recipe['tags'] = scraper.findTagsOnPage(page)[3:]
    recipe['ingredients'] = scraper.findIngredientsOnPage(page)
    recipe['directions'] = scraper.findDirectionsOnPage(page)

    recipes[str(recipe_id)] = recipe # Add dictionary to container.
    
scraper.writeJson(recipes)
