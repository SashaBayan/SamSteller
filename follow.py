#TODO: add functions to grab strings from the articles to keep the autofollowing process interesting

from twitter_follow_bot import auto_follow

auto_follow("#nyt", count=1000)

from twitter_follow_bot import auto_fav

auto_fav("#news", count=1000)