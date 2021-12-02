var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

app.get('/bmi', function (req, res) {
    var bmi = 0;

    if(req.query.type == "metric")
    {
        bmi = computeMetric(req.query.height, req.query.weight);
    } else if(req.query.type == "us")
    {
        bmi = computeUs(req.query.height, req.query.weight);
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(
        JSON.stringify({
            bmi: Math.round(bmi * 100) / 100
        })
    );
});

function computeMetric(h,w)
{
    var height = h * .01;
    var weight = w;

    return weight / (height * height);
}

function computeUs(h,w)
{
    var height = h;
    var weight = w;

    return weight / (height * height) * 703;
}
    
var hostname  = '127.0.0.1';
var port      = 3001;
app.listen(port, hostname, function () {
    console.log("Example app listening at http://%s:%s", hostname, port);
});