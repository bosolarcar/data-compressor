var fs = require('fs');

var data = JSON.parse(fs.readFileSync('test/visualisation/data.json', 'utf8'))

        data.forEach(function(d, i) {
            var obj = {}
            obj.date = d[0];
            obj.value = +d[1];
            data[i] = obj
        });

var json = JSON.stringify(data);

fs.writeFileSync('myjsonfile.json', json, 'utf8');

