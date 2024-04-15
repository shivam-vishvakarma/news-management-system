from newsapi import NewsApiClient
import json

# Init
newsapi = NewsApiClient(api_key='54ee2dbc65b84feaa722d0ef5b191f57')

# /v2/top-headlines
top_headlines = newsapi.get_top_headlines(q='bitcoin',
    category='business',
    language='en',
    country='in')


sources = newsapi.get_sources()
print(json.dumps(sources, indent=4))


