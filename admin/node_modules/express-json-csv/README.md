# Express-json-csv [![NPM version](https://badge.fury.io/js/express-json-csv.png)](http://badge.fury.io/js/express-json-csv) [![Build Status](https://travis-ci.org/darul75/express-json-csv.png?branch=master)](https://travis-ci.org/darul75/express-json-csv) [![Total views](https://sourcegraph.com/api/repos/github.com/darul75/express-json-csv/counters/views.png)](https://sourcegraph.com/github.com/darul75/express-json-csv)

Simple JSON to CSV response handler for Express

## Why ?

Is some case, you may need to save a JSON as a CSV by instance.

## Install

~~~
npm install express-json-csv
~~~

## Usage

```javascript
var express = require('express'),
    jsoncsv = require('express-json-csv')(express);

var app = module.exports = express();

app.configure(function(){    
    ...
});

app.get('/', function(req, res) {
  res.csv(
    [{field: 'v1', field2: 'v2'}, {field: 'v3', field2: 'v4'}],
    {fields:['field', 'field2']});
});
```

## Options

- see extra param here, first one is wrapped 'data', other ones like fields, or extra param are here https://github.com/zeMirco/json2csv

## License

The MIT License (MIT)

Copyright (c) 2013 Julien Valéry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
