import csv
import random
import time

from pywikihow import HowTo, RandomHowTo

url_arr = ["https://www.wikihow.com/Cite-the-WHO-in-APA", "https://www.wikihow.com/Develop-Healthy-Eating-Habits", "https://www.wikihow.com/Bleach-Skin-with-Peroxide"]

with open("data.csv", 'wt',  newline='') as f:
    csvwriter = csv.writer(f)
    for url in url_arr:
        time.sleep(3)
        how_to = HowTo(url)
        for step in how_to.steps:
            csvwriter.writerow([how_to.url, how_to.title, "partTitle", step.number, step.summary, step.description])

# data = how_to.as_dict()
print(how_to.url)
# print(how_to.title)
# print(how_to.intro)
# print(how_to.n_steps)
# print(how_to.summary)
#
first_step = how_to.steps[0]
first_step.print()
data = first_step.as_dict()
print(data)

# how_to.print(extended=True)
