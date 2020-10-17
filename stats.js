document.getElementById('displayedMonth').addEventListener('click', showMenu)
document.getElementById('uList').addEventListener('click', selectMonth)

window.$ = window.jQuery = require('jquery');

var showing = false;

var currentMonth = "January";
var currentMonthInt = "1";
var incomeInt = 5;
var allowanceInt = 5;
var billsInt = 4;
var savings = 515;

//Since January is starting date, load data from that 1st.
window.onload = function(){
    //document.getElementById('hideMonths').style.display = "block"
    LoadMonthInfo();
}

//This is just the toggle to display
//dropdown menu (Month Selector)
function showMenu() {
    if(showing == false) {
    document.getElementById('hideMonths').style.display = "block"
    document.getElementById('displayedMonth').style.color = "rgba(81, 203, 238, 1)";
    showing = true
    }
    else {
        document.getElementById('displayedMonth').style.color = "white";
        document.getElementById('hideMonths').style.display = "none"
        showing = false;
    }
}

function LoadMonthInfo() {
    var displayMonth = document.getElementById('displayedMonth');
    console.log(currentMonth);
    const fs = require('fs');


    var userData = fs.readFile(__dirname + "\\months" + "\\monthlyData.json", 'utf8', function (err, data) {
    
    console.log("data is " + data);
    var parsed = JSON.parse(data);
    month = parsed.month;
    
    document.getElementById('income').innerHTML = "No info available.";
    document.getElementById('allowance').innerHTML = "No info available.";
    document.getElementById('bills').innerHTML = "No info available.";

    if(currentMonth == "January") {
        currentMonthInt = "1";
        console.log(currentMonthInt)
    }
    else if(currentMonth == "February") {
        currentMonthInt = "2";
        console.log(currentMonthInt)
    }
    else if(currentMonth == "March") {
        currentMonthInt = "3";
        console.log(currentMonthInt)
    }
    else if(currentMonth == "April") {
        currentMonthInt = "4";
        console.log(currentMonthInt)
    }
    else if(currentMonth == "May") {
        currentMonthInt = "5";
        console.log(currentMonthInt)
    }
    else if(currentMonth == "June") {
        currentMonthInt = "6";
        console.log(currentMonthInt)
    }
    else if(currentMonth == "July") {
        currentMonthInt = "7";
        console.log(currentMonthInt)
    }
    else if(currentMonth == "August") {
        currentMonthInt = "8";
        console.log(currentMonthInt)
    }
    else if(currentMonth == "September") {
        currentMonthInt = "9";
        console.log(currentMonthInt)
    }
    else if(currentMonth == "October") {
        currentMonthInt = "10";
        console.log(currentMonthInt)
    }
    else if(currentMonth == "November") {
        currentMonthInt = "11";
        console.log(currentMonthInt)
    }
    else if(currentMonth == "December") {
        currentMonthInt = "12";
        console.log(currentMonthInt)
    }
    else {
        alert("error somewhere")
    }


    parsed.forEach(item => {
        if(currentMonthInt == item.month) {
            console.log("It matches.");
            incomeInt = item.income;
            allowanceInt = item.allowance;
            billsInt = item.bills;
            document.getElementById('income').innerHTML = "Your monthly income was: $" + incomeInt;
            document.getElementById('allowance').innerHTML = "Your monthly allowance was: $" + allowanceInt;
            document.getElementById('bills').innerHTML = "Your monthly bill costs were: $" + billsInt;
            makeGraph();
        }
       /*  else {
            console.log(currentMonthInt);
            console.log(item.month);
            document.getElementById('income').innerHTML = "No info available.";
            document.getElementById('allowance').innerHTML = "No info available.";;
            document.getElementById('bills').innerHTML = "No info available.";;
        }
        */
    });
})
}


function selectMonth() {

    document.getElementById('displayedMonth').textContent
}

// Adds function to each component of list
// When clicked, will change to that month
$('.ulClass li').on('click', function () { 
    var that = $(this);
    that.parent().find('li.active').removeClass('active'); // go to parent and then find li
    $(this).addClass('active');
    currentMonth = this.innerHTML;
    console.log(this.innerHTML);
    document.getElementById('displayedMonth').innerHTML = this.innerHTML;
    LoadMonthInfo();
    showMenu();
});

//Makes the graph
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