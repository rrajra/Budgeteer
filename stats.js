document.getElementById('displayedMonth').addEventListener('click', showMenu)
document.getElementById('uList').addEventListener('click', selectMonth)

window.$ = window.jQuery = require('jquery');

var showing;

var currentMonth = "January";
var incomeInt = 5;
var allowanceInt = 5;
var billsInt = 4;
var savings = 515;

//Since January is starting date, load data from that 1st.
window.onload = function(){
    LoadMonthInfo();
}

function showMenu() {
    if(showing == false) {
    document.getElementById('hideMonths').style.display = "block"
    showing = true
    }
    else {
        document.getElementById('hideMonths').style.display = "none"
        showing = false;
    }
}

function LoadMonthInfo() {
    const fs = require('fs');
    var userData = fs.readFile(__dirname + "\\months" + "\\monthlyData.json", 'utf8', function (err, data) {
    
    console.log("data is " + data);
    var parsed = JSON.parse(data);
    month = parsed.month;
    
    for(var i = 0; i < parsed.length; i++) {
        var obj = parsed[i];
    
        console.log("OBJ is " + obj);
        console.log("Obj ID(MO) is = " + obj.month0);
    }
    

   // incomeInt = x;
   // allowanceInt = x;
   // billsInt = x;
   // savings = x;
})
makeGraph();
}


function selectMonth() {

    document.getElementById('displayedMonth').textContent
}

$('.ulClass li').on('click', function () { // internally will iterate and add listener to each li
    var that = $(this);
    that.parent().find('li.active').removeClass('active'); // go to parent and then find li
    $(this).addClass('active');
    currentMonth = this.innerHTML;
    console.log(this.innerHTML);
    document.getElementById('displayedMonth').innerHTML = this.innerHTML;
    LoadMonthInfo();
    showMenu();
});


function makeGraph () {
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Income', 'Allowance', 'Bills', 'Savings'],
        datasets: [{
            label: 'Budget',
            data: [incomeInt, allowanceInt, billsInt, savings],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
});
}