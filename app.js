// express app
let express = require('express'),
    app = express();

// serial port (to connect to the weighing machine)
let serialport = require("serialport"),
    sp = new serialport("COM3");

// read line (to get 1 line of 16 bytes)
let Readline = serialport.parsers.Readline,
    parser = new Readline();
sp.pipe(parser);

// format function
const format = require('./src/formatWeight');

// app
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/json');

    parser.on('data', function (data) {
        var poids, sign, value, unit;

        format.weight('data:' + data, function (val) {
            poids = val['poids'];
            sign = val['sign'];
            unit = val['unit'];
            value = val['value'];
        });

        var infos = {
            poids: poids,
            sign: sign,
            value: value,
            unit: unit
        };
        
        res.end(infos);
    });

    // retourne une erreur si la balance n'est pas connecté
    setTimeout(function () {
        res.end('getWeight({"error": "balance non connecté"})');
    }, 3000);

});

app.listen(80);
