var json2csv = require('json2csv');

module.exports = function(express) {    
  
    express.response.csv = function(obj, options){        

        var o;

        // allow status / body
        if (2 == arguments.length) {
            // res.json(body, status) backwards compat
            if ('number' == typeof arguments[1]) {
              this.statusCode = arguments[1];
            }
            else if ('object' == typeof arguments[1]) {
              o = arguments[1];  
            }
            else {
              this.statusCode = obj;
              obj = arguments[1];
            }
        }

        if (!o || !o.fields)
            return this.send(500, { error: 'options has to be a correct parameter' });

        // settings

        // content-type
        this.charset = this.charset || 'utf-8';        

        var app = this.app;
        var replacer = app.get('json replacer');
        var spaces = app.get('json spaces');
        var body = '';        
        try {
            JSON.stringify(obj, replacer, spaces);            
            o.data = obj;            
        }
        catch (err) {
            body = obj;
        }

        var this_ = this;

        if (o.data) {
            json2csv(o, function(err, csv) {
                if (err) return this.send(500, { error: 'bad options param' });

                this_.set('Content-Type', 'text/csv');
                this_.setHeader("Content-Disposition", "attachment; filename=" + "export.csv");

                return this_.send(csv);
            });
        }
        else {
            this.send(500, { error: 'no data to convert, check obj param' });
        }        

    };
};
