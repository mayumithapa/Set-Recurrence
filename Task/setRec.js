// toggling days from white to purple
function dayIsClicked() {
    
    if(this.style.backgroundColor !== 'rgb(91, 95, 199)'){
        
        this.style.backgroundColor = 'rgb(91, 95, 199)';
        this.style.color = 'white';
    
    }
    else{
        this.style.backgroundColor = 'white';
        this.style.color = 'black'
        
        
    }
}


// event listener for hovering
function mouseHoverDays(){
    document.querySelectorAll('.days').forEach(button => {
        button.addEventListener('mouseover', () => {
            if(button.style.backgroundColor === 'rgb(91, 95, 199)'){
                console.log("");
            }
            else{
                    button.style.backgroundColor = 'rgb(206, 205, 205)';
                    button.style.color = 'black';
                }
        })
        })
        
    document.querySelectorAll('.days').forEach(button => {
        button.addEventListener('mouseout', () => {
            if(button.style.backgroundColor === 'rgb(91, 95, 199)'){
                console.log("");
                
            }
            else{
                    button.style.backgroundColor = 'white';
                    button.style.color = 'black';
                }
            })
        })
}

mouseHoverDays();

// paragraph updation function for month comp for month drop downs

function updateMonthDropDown(){
    var whichDayOfWeek = document.getElementById("monthDropDown1").value;
    var weekDay = document.getElementById("monthDropDown2").value;

    document.getElementById("selectedDays").textContent = `Ocuurs every month on ${whichDayOfWeek} ${weekDay} starting from ${startDateInput.value} until ${endDateInput.value}`;
}

// paragraph updation function for month comp for On day input

function updateMonthOnday(){
    var onDay = document.getElementById("inputNumMonth").value;
    document.getElementById("selectedDays").textContent = `Ocuurs every month on day ${onDay} starting from ${startDateInput.value} until ${endDateInput.value}`;
}


// paragraph updation function for week comp
function updateSelectedDays() {
    const selectedButtons = document.querySelectorAll(".days.selected");
    const selectedDays = Array.from(selectedButtons).map(button => button.id);

    let formattedDays = "";
    if (selectedDays.length ===7){
        formattedDays = "day";
    } 
    else if(selectedDays.length > 1) {
        const lastDay = selectedDays.pop();
        formattedDays = selectedDays.join(", ") + " and " + lastDay;
    }
    else {
        formattedDays = selectedDays.join(", ");
    }

    document.getElementById("selectedDays").textContent = `Occurs every ${formattedDays} starting from ${startDateInput.value} until ${endDateInput.value}`;
}


// event listener for both
function btnOnclick(){
    document.querySelectorAll(".days").forEach(button => {
        button.addEventListener("click", function() {
            button.classList.toggle("selected");
            dayIsClicked.call(this);
            updateSelectedDays();
        });
    });
}
btnOnclick();


// Month component
document.getElementById('select-month-week').addEventListener('change', monthComponent)
function monthComponent(event){
    const selectedOption = event.target.value;

    if(selectedOption === 'month'){
        document.querySelector('.main-container').style.height = 'auto'; 
        document.querySelector('.grid-container').style.gridTemplateRows = '30px 20px 74px 30px'; 

        var monthRadioButtons = document.getElementById('monthRadioButtons');
        var weekToMonth = document.getElementById('weekToMonth');
        monthRadioButtons.hidden=false;
        weekToMonth.hidden = true;
        // updateSelectedDaysMonthly();

        document.querySelector("#combinedDiv").innerHTML = `
                <label for="radio1"><div style="height: 45px;"></div></label>
                <label for="radio2"><div style="height: 35px;"></div></label>
            `

    }
    else{
        document.querySelector('.main-container').style.height = '340px';
        document.querySelector('.grid-container').style.gridTemplateRows = '30px 30px 30px 30px';
        monthRadioButtons = document.getElementById('monthRadioButtons');
        weekToMonth = document.getElementById('weekToMonth');
        monthRadioButtons.hidden=true;
        weekToMonth.hidden = false;
        updateSelectedDays();

            btnOnclick();
            mouseHoverDays();

        // alert("week selected");
    }
    
}


// radio buttons toggle
var radio1 = document.getElementById('radio1');
var input1 = document.getElementById('inputNumMonth'); 
var box1 = document.getElementById('box1');
var box2 = document.getElementById('box2');
var radio2 = document.getElementById('radio2');
var monthDropDown1 = document.getElementById('monthDropDown1'); 
var monthDropDown2 = document.getElementById('monthDropDown2'); 


radio1.addEventListener('click', () =>{
    // alert("checked");
    input1.disabled= false;
    monthDropDown1.disabled=true;
    monthDropDown2.disabled=true;

    document.getElementById("inputNumMonth").addEventListener('change',updateMonthOnday);
    
})
radio2.addEventListener('click', ()=>{
    input1.disabled=true;
    monthDropDown1.disabled=false;
    monthDropDown2.disabled=false;

    document.getElementById("monthDropDown1").addEventListener('input', updateMonthDropDown);
    document.getElementById("monthDropDown2").addEventListener('input', updateMonthDropDown);
})


// min max range for repeat every input

var inputNum = document.getElementById('inputNum');

inputNum.addEventListener('input', function() {
    var value = parseInt(inputNum.value, 10);
    if (value < parseInt(inputNum.min, 10)) {
        inputNum.value = inputNum.min;
    } else if (value > parseInt(inputNum.max, 10)) {
        inputNum.value = inputNum.max;
    }
});

var inputNumMonth = document.getElementById('inputNumMonth');

inputNumMonth.addEventListener('input', function() {
    // alert("yes");
    var val = parseInt(inputNumMonth.value, 10);
    if (val < parseInt(inputNumMonth.min, 10)) {
        inputNumMonth.value = inputNumMonth.min;
    } else if (val > parseInt(inputNumMonth.max, 10)) {
        inputNumMonth.value = inputNumMonth.max;
    }
});
// date disabling
// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

document.addEventListener('DOMContentLoaded', function() {
    var startDateInput = document.getElementById('startDateInput');
    var endDateInput = document.getElementById('endDateInput');

    startDateInput.min = getTodayDate();  // Set min attribute to today's date
    endDateInput.min = getTodayDate();
    // Function to update min attribute of endDateInput based on startDateInput value
    function updateEndDateMin() {
        endDateInput.min = startDateInput.value;
        validateEndDate(); // Validate end date immediately after updating min attribute
    }

    // Function to validate end date
    function validateEndDate() {
        if (endDateInput.value < startDateInput.value) {
            endDateInput.value = startDateInput.value;
            // alert(startDateInput.value);
            // alert(endDateInput.value);
        }
    }
    startDateInput.addEventListener('input', updateEndDateMin);
    endDateInput.addEventListener('input', validateEndDate);

});




