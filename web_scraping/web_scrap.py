import requests
from bs4 import BeautifulSoup

url="https://in.indeed.com/jobs?q&l=kerala&advn=6256887749764427&vjk=1277ab33faa3ce05"
res=requests.get(url)
soup=BeautifulSoup(res.text,'lxml')
jobs=soup.find_all('div',{'class':'job_seen_beacon'})
print(jobs)
for job in jobs:
    job_title=job.find('a')
    link=job['href']