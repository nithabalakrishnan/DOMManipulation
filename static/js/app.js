var tableData = data;
var tbody = d3.select("#ufo-tbody");
var resetBtn = d3.select("#reset-btn");
var dateBtn = d3.select("#datetime")
var cityDropDownBtn = d3.select("#select-city");
var stateDropDownBtn = d3.select("#select-state");
var shapeDropDownBtn = d3.select("#select-shape");
var dropDownMenuDiv = d3.select("#city-dropdown");

var cities =[];
var states = [];
var countries = [];
var shapes = [];

tableData.forEach(dataVal => {
    cities.push(dataVal.city);
    states.push(dataVal.state);
    countries.push(dataVal.country);
    shapes.push(dataVal.shape);
})

var distinctCities = [...new Set(cities)].sort();
var distinctStates = [...new Set(states)].sort();
var distinctShape = [...new Set(shapes)].sort();

var selectCity = document.getElementById("select-city");
var selectShape = document.getElementById("select-shape");
var selectSate = document.getElementById("select-state");
var selCity = document.getElementById("select-city");


populateDropDownMenu(selCity,distinctCities);
populateDropDownMenu(selectCity,distinctCities);
populateDropDownMenu(selectSate,distinctStates);
populateDropDownMenu(selectShape,distinctShape);

// Cloning the each div for later loading to irginal state
var originalDate = $("#datetime").clone();
var originalCity = $("#select-city").clone();
var originalState = $("#select-state").clone();
var originalShape = $("#select-shape").clone();

//dropDownBtn.on("click",populateDropDownMenu),
function populateDropDownMenu(choice,optVal) {
    
    console.log("items: ",optVal)
    
    for (var i = 0; i < optVal.length; i++) {                
        var option = document.createElement("OPTION");
        txt = document.createTextNode(optVal[i]);
        option.appendChild(txt);
        option.setAttribute("value", optVal[i]);
        option.setAttribute("class","text-uppercase");
        choice.insertBefore(option, choice.lastChild);
      } 
}

function populateTableData(data) {
    console.log("inside populate");
    tbody.text("");
    data.map(data => {
        var row = tbody.append("tr");
        console.log(data.datetime)
        row.append("td").text(data.datetime).attr("class","font-style");
        row.append("td").text(data.city).attr("class","text-capitalize font-style");
        row.append("td").text(data.state).attr("class","text-uppercase font-style");
        row.append("td").text(data.country).attr("class","text-uppercase font-style");
        row.append("td").text(data.shape).attr("class","text-capitalize font-style");
        row.append("td").text(data.durationMinutes).attr("class","font-style");
        row.append("td").text(data.comments).attr("class","font-style");
    });
}


populateTableData(tableData);

function loadWarning(message){
    console.log("Inside loadWarning!!")
    var alertDiv = filterDiv.append("div").attr("class","alert alert-danger alert-dismissible fade  show");
    alertDiv.append("button").attr("type","button").attr("class","close").text("&times;");
}
function filterData(event){
    console.log("entering filtered ")
    var city = d3.select("#select-city").property("value");
    var state = d3.select("#select-state").property("value");
    var shape = d3.select("#select-shape").property("value");
    formDate =document.getElementById("datetime").value;
    var date = new Date(formDate)
    var formattedDate = (date.getMonth() + 1) + '/' + (date.getDate() + 1) + '/' +  date.getFullYear()
    var formData = {};

    if(formDate !== ""){
        console.log("Date entered is : ",formattedDate);
        formData["datetime"] = formattedDate;

    }
    if(city !== ' '){
    
        
        formData["city"] = city;
    }
    if(state !== ' '){
        
        formData["state"] = state;
    }
    if(shape != ' '){
        
        formData["shape"] = shape;
    }
    
    var filteredData = tableData.filter(function(item) {
        for (var key in formData) {
            if (item[key] != formData[key])
            return false;
        }
        return true;
    });
    if(filteredData.length > 0) {
        console.log("Data size > 0: ",filteredData.length)
        populateTableData(filteredData);
    }else{
        console.log("Data size warning: ",filteredData.length)
        $("#buttonAlert").addClass('show')
    }   
}

function reset(event) {
    populateTableData(tableData);
    $('#buttonAlert').removeClass('show');
}

function test(event){
    
    
    var city = d3.select("#select-city").property("value");
    var filterCityData = tableData.filter(item => item.city === city)
    console.log(city)
    console.log(filterCityData)
    var menuStateList = [];
    var menuShapeList = [];
    filterCityData.forEach(dataVal => {
        
        menuStateList.push(dataVal.state);
        menuShapeList.push(dataVal.shape);
    })
    console.log(menuStateList)
    distinctStates = [...new Set(menuStateList)].sort();
    distinctShape = [...new Set(menuShapeList)].sort();
    stateDropDownBtn.text ("");
    shapeDropDownBtn.text ("");
    populateDropDownMenu(selectSate,distinctStates);
    populateDropDownMenu(selectShape,distinctShape);
    
    filterData();


}
function test2(event){
    x= document.getElementById("datetime").value;
    var EventTarget = event.
    console.log(x);
}

//filterBtn.on("click",filterData);
resetBtn.on("click",reset);
cityDropDownBtn.on("change",filterData);

stateDropDownBtn.on("change",filterData)
shapeDropDownBtn.on("change",filterData)
