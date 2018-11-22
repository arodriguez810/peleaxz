YYYY	2014	4 or 2 digit year
YY	14	2 digit year
Y	-25	Year with any number of digits and sign
Q	1..4	Quarter of year. Sets month to first month in quarter.
M MM	1..12	Month number
MMM MMMM	Jan..December	Month name in locale set by moment.locale()
D DD	1..31	Day of month
Do	1st..31st	Day of month with ordinal
DDD DDDD	1..365	Day of year
X	1410715640.579	Unix timestamp
x	1410715640579	Unix ms timestamp


nodemon --watch 0-config --watch 1-models --watch 2-service --watch modules --watch server.js server.js