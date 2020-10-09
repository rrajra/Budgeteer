const { fstat } = require('fs');

window.$ = window.jQuery = require('jquery');

var jan = document.getElementById('JanData');
var feb = document.getElementById('FebData');
var mar = document.getElementById('MarData');
var apr = document.getElementById('AprData');
var may = document.getElementById('MayData');
var jun = document.getElementById('JunData');
var jul = document.getElementById('JulData');
var aug = document.getElementById('AugData');
var sep = document.getElementById('SepData');
var oct = document.getElementById('OctData');
var nov = document.getElementById('NovData');
var dec = document.getElementById('DecData');
  
var month;

$( document ).ready(function() {
    loadData();
});

function loadData() {
    const fs = require('fs');
    var userData = fs.readFile(__dirname + "\\months" + "\\monthlyData.json", 'utf8', function (err, data) {
    
    console.log("data is " + data);
    var parsed = JSON.parse(data);
    month = parsed.month;

    parsed.forEach((item) => {
        console.log(item.month)
        console.log(item.income);
        if(item.month == 0) 
        {
            jan.textContent = "Income is: " + item.income + " Allowance is: " + item.allowance + " Bills Are: " + item.bills;
        }
        else if(item.month == 1) {
            feb.textContent = "Income is: " + item.income + " Allowance is: " + item.allowance + " Bills Are: " + item.bills;
        }
        else if(item.month == 2) {
            mar.textContent = "Income is: " + item.income + " Allowance is: " + item.allowance + " Bills Are: " + item.bills;
        }
      });

    if(month == 8) {
        sep.textContent = "Income is: " + parsed.income + " Allowance is: " + parsed.allowance + " Bills Are: " + parsed.bills;
    }
  });
}