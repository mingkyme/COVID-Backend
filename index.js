const express = require('express');
const convert = require('xml-js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app = express();

app.get('/', function (req, res) {
    var xhr = new XMLHttpRequest();

    var requestURL = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?";
    var serviceKey = "serviceKey=" + encodeURIComponent(req.query.serviceKey);
    var pageNo = "&pageNo=" + req.query.pageNo;
    var numOfRows = "&numOfRows=" + req.query.numOfRows;
    var startCreateDt = "&startCreateDt=" + req.query.startCreateDt;
    var endCreateDt = "&endCreateDt=" + req.query.endCreateDt;

    var json = req.query.json;
    requestURL = requestURL + serviceKey + pageNo + numOfRows + startCreateDt + endCreateDt;

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (json) {
                res.send(convert.xml2json(xhr.responseText, { 'compact': true }));

            } else {
                res.send(xhr.responseText);

            }
        }
    }
    xhr.open('GET', requestURL);
    xhr.send();
});
app.listen(11002);