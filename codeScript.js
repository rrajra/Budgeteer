const {remote, Debugger} = require('electron');
const jetpack = require('fs-jetpack');
var os = require('os');
const { exists } = require('fs-jetpack');
window.$ = window.jQuery = require('jquery');
const BrowserWindow = remote.BrowserWindow;

document.getElementById('close').addEventListener('click', closeWindow);
document.getElementById('minimize').addEventListener('click', minimizeWindow);
document.getElementById('continue').addEventListener('click', nextMove);
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      nextMove();
    }
    else {
        console.log("not enter it's. " + e.key);
    }
});
document.getElementById('back').addEventListener('click', backMove);
document.getElementById('editInfo').addEventListener('click', editBtnInfo);
document.getElementById('viewPast').addEventListener('click', viewHistory);

var warning = document.getElementById('invalidNum');
var income = document.getElementById('minc');
var allowance = document.getElementById('mal');
var bills = document.getElementById('mbi');
var backBtn = document.getElementById('back');
var currency = "$";

var currentDate = new Date();
var month = currentDate.getMonth();

var inputIncome = document.getElementById('mIncome');

var incomeInt = 0;
var allowanceInt = 0;
var billsInt = 0;
var savings = 0;

var isEditing = false;

document.addEventListener('DOMContentLoaded', (event) => {
    lookForFile();    
})

function closeWindow() {
    var window = remote.getCurrentWindow()
    window.close()
}

function minimizeWindow() {
    var window = remote.getCurrentWindow();
    window.minimize();
}

function nextMove() {

    var introText = document.getElementById('introText');

    if(income.style.display === "") {
        income.style.display = "block";
    }

    if(income.style.display === "block") {
        var xyz = document.getElementById('mIncome').value;
        incomeInt = xyz;

        if(incomeInt >= 0 && incomeInt != "") {
            income.style.display = "none";
            allowance.style.display = "block";
            bills.style.display = "none";
            backBtn.style.display = "flex";
            introText.style.display = "none";
            warning.style.display = "none";
            console.log(incomeInt + " go forward");
            console.log(incomeInt);
        }
        else {
            warning.style.display = "flex";
            console.log("error! enter a valid int");
        }
    }
    else if (allowance.style.display === "block") {
        var x = document.getElementById('mAllowance').value;
        allowanceInt = x;
        
        if(allowanceInt >= 0 && allowanceInt != "") {
        income.style.display = "none";
        allowance.style.display = "none";
        bills.style.display = "block";
        warning.style.display = "none";
        }
        else {
            warning.style.display = "flex";
            console.log("error! enter a valid int");
        }
    }
    else if (bills.style.display === "block") {
        var x = document.getElementById('mBills').value;
        billsInt = x;

        if(billsInt >= 0 && billsInt != "") {
        income.style.display = "none";
        allowance.style.display = "none";
        bills.style.display = "none";
        backBtn.style.display = "none";
        warning.style.display = "none";

        var continuationBtn = document.getElementById('continue').style.display = "none";
        var done = document.getElementById('mainmenu').style.display = "flex";
        console.log(month);
        saveData();
        EnterMenu();
        }
        else {
            warning.style.display = "flex";
            console.log("error! enter a valid int");
        }
    }
}

    function viewHistory() {
        console.log("viewing history");
        console.log(__dirname + "menuHandler.js")
        var newWindow = null;
        newWindow = new BrowserWindow( {
            height: 485,
            width: 900,
            frame: false,
            title: 'Past Info',
            fullscreenable: false,
            webPreferences: {
                nodeIntegration: true,
              }
            })
            newWindow.loadFile('statsPage.html')
    }

    // Back button will only show up after income is entered
    function backMove() {

        if (allowance.style.display == "block") {
            income.style.display = "block";
            allowance.style.display = "none";
            bills.style.display = "none";
            backBtn.style.display = "none";
            warning.style.display = "none";
        }
        if (bills.style.display == "block") {
            income.style.display = "none";
            allowance.style.display = "block";
            bills.style.display = "none";
            warning.style.display = "none";
        }
    }

    function EnterMenu() {
        var disInc = document.getElementById('displayInc');
        var disAllow = document.getElementById('displayAllow');
        var disBills = document.getElementById('displayBills');
        var disName = document.getElementById('userName');
        var introPad = document.getElementById('introPaddingHide')

        introPad.style.padding = 0;

        savings = incomeInt - allowanceInt - billsInt;
        console.log(savings);

        disInc.innerHTML = "Your monthly income is: " + currency + incomeInt;
        disAllow.innerHTML = "Your monthly allowance is: " + currency + allowanceInt;
        disBills.innerHTML = "Your monthly bill costs are: "+ currency + billsInt;
        const computerName = os.userInfo().username;
        var colored = computerName.fontcolor("#00C2E0")
        disName.innerHTML = "Welcome, " + colored;
        makeGraph();
    }

    function editBtnInfo() {
        var editBtn = document.getElementById("editInfo");
        if(isEditing == false) {
            //Editing
            editBtn.value = "Done"
            editBtn.textContent ="Done"
            isEditing = true;
            Editing();
        }
        else if(isEditing == true) {
            //Done editing
            doneEditing();
        }
        else {
            console.log(editBtn.value);
            isEditing = false;
        }
    }

    function Editing() {
        if(isEditing == true) {
        var dInc = document.getElementById("displayInc");
        var dAlow = document.getElementById("displayAllow");
        var dBil = document.getElementById("displayBills");
        var inputInc = document.getElementById("inputInc");
        var mIncText = document.getElementById('mIncText');
        var mAlowText = document.getElementById('mAlowText');
        var mBilText = document.getElementById('mBilText');

        $(dInc).mouseenter(function() {
            if(isEditing == true) {
            $(dInc).css('cursor','pointer')
            $(dInc).css('color','yellow')
            }
        })
        $(dInc).mousedown(function() {
            if(isEditing == true) {
                console.log(dInc);
                dInc.style.display = 'none';
                inputInc.style.display = 'block';
                mIncText.style.display = 'block';
            }
        })
        $(dAlow).mousedown(function() {
            if(isEditing == true) {
                console.log(dAlow);
                dAlow.style.display = 'none';
                inputAlow.style.display = 'block';
                mAlowText.style.display = 'block';
            }
        })
        $(dBil).mousedown(function() {
            if(isEditing == true) {
                console.log(dBil);
                dBil.style.display = 'none';
                inputBil.style.display = 'block';
                mBilText.style.display = 'block';
            }
        })
        $(dAlow).mouseenter(function() {
            if(isEditing == true) {
            $(dAlow).css('cursor','pointer')
            $(dAlow).css('color','yellow')
            }
        })
        $(dBil).mouseenter(function() {
            if(isEditing == true) {
            $(dBil).css('cursor','pointer')
            $(dBil).css('color','yellow')
            }
        })
        $(dInc).mouseleave(function() {
            $(dInc).css('cursor','default')
            $(dInc).css('color', 'white');
        })
        $(dAlow).mouseleave(function() {
            $(dAlow).css('cursor','default')
            $(dAlow).css('color', 'white');
        })
        $(dBil).mouseleave(function() {
            $(dBil).css('cursor','default')
            $(dBil).css('color', 'white');
        })
    }
    }
    function doneEditing() {
        var editBtn = document.getElementById("editInfo");
        var dInc = document.getElementById("displayInc");
        var dAlow = document.getElementById("displayAllow");
        var dBil = document.getElementById("displayBills");
        var inputInc = document.getElementById("inputInc");
        var inputAlow = document.getElementById("inputAlow");
        var inputBil = document.getElementById("inputBil");
        var mIncText = document.getElementById('mIncText');
        var mAlowText = document.getElementById('mAlowText');
        var mBilText = document.getElementById('mBilText');

        if(isEditing == true) 
        {
            editBtn.value = "Edit Info"
            editBtn.textContent = "Edit Info"
            isEditing = false;
            $(dInc).css('cursor','default')
            $(dInc).css('color','white')
            $(dAlow).css('cursor','default')
            $(dAlow).css('color','white')
            $(dBil).css('cursor','default')
            $(dBil).css('color','white')
            dInc.style.display = 'flex';
            inputInc.style.display = 'none';
            dAlow.style.display = 'flex';
            inputAlow.style.display = 'none';
            dBil.style.display = 'flex';
            inputBil.style.display = 'none';
            mIncText.style.display = 'none';
            mAlowText.style.display = 'none';
            mBilText.style.display = 'none';
            if(inputInc.value >= 0 && inputInc.value != "") 
            {
                incomeInt = inputInc.value;
                EnterMenu();
                saveData();
            }
            else {
            }
            if(inputAlow.value >= 0 && inputAlow.value != "") 
            {
                allowanceInt = inputAlow.value;
                EnterMenu();
                saveData();
            }
            else {
            }
            if(inputBil.value >= 0 && inputBil.value != "") 
            {
                billsInt = inputBil.value;
                EnterMenu();
                saveData();
            }
            else {
            }
        }
    }

    function lookForFile(){

        var file = __dirname + "\\data.json"

        exists(file);
        yesno = exists(file);

        if(yesno == "file") {
            console.log("Works");
            income.style.display = "none";
            allowance.style.display = "none";
            bills.style.display = "none";
            backBtn.style.display = "none";
            warning.style.display = "none";
            var introText = document.getElementById('introText').style.display = "none";
            var continuationBtn = document.getElementById('continue').style.display = "none";
            var done = document.getElementById('mainmenu').style.display = "flex";
            readData();
        }
        else {
            console.log("not working");
        }
    }

    function readData() {
            const fs = require('fs');
            var userData = fs.readFile(__dirname + "\\data.json", 'utf8', function (err, data) {
              
              console.log("data is " + data);
              var parsed = JSON.parse(data);
              console.log(parsed.income);


             incomeInt = parsed.income;
             allowanceInt = parsed.allowance;
             billsInt = parsed.bills;
             EnterMenu();
            });
    }

    function saveData() {
        var toSave = {
            income: incomeInt, 
            allowance: allowanceInt, 
            bills: billsInt
        }
        var saveMonthly = {
            month: month,
            income: incomeInt, 
            allowance: allowanceInt, 
            bills: billsInt
        }
        //This just writes out what the current data is
        jetpack.write('data.json', toSave);

            const fs = require('fs');
            var userData = fs.readFile(__dirname + "\\months" + "\\monthlyData.json", 'utf8', function (err, data) {
              
              console.log("data is " + data);
              var parsed = JSON.parse(data);
              console.log(parsed.month);
            })
        //This writes out the monthly history
        jetpack.write('months//monthlyData.json', saveMonthly);
    }


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
