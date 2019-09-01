var tableData = data;
var tbody = d3.select("#ufo-tbody");
var filterDiv = d3.select("#filter-date");
var filterBtn = d3.select("#filter-btn");
var resetBtn = d3.select("#reset-btn");
var dropDownBtn = d3.select("#city-dropdown-btn");
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


populateDropDownMenu(selectCity,distinctCities);
populateDropDownMenu(selectSate,distinctStates);
populateDropDownMenu(selectShape,distinctShape);

//dropDownBtn.on("click",populateDropDownMenu),
function populateDropDownMenu(choice,optVal) {
    
    
    
    for (var i = 0; i < optVal.length; i++) {                
        var option = document.createElement("OPTION"), 
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
    
    /*alertDiv.insert("strong").text(message);*/
    
}
function filterData(event){
    
    var date = d3.select("#datetime").property("value");
    var startDate = '1/1/2010';
    var endDate = '1/13/2010';
    var city = d3.select("#select-city").property("value");
    var state = d3.select("#select-state").property("value");
    var shape = d3.select("#select-shape").property("value");

    console.log("city: ",city)
    console.log(state)
    console.log(shape)

    var formData = {};

    if(date !== '') {
    
        console.log(date)
        formData["datetime"] = date;
    }
    if(city !== ' '){
    
        console.log("city :",city)
        formData["city"] = city;
    }
    if(state !== ' '){
        console.log("Sate :",state)
        formData["state"] = state;
    }
    if(shape != ' '){
        console.log("Shape :",shape)
        formData["shape"] = shape;
    }

    var filteredData = tableData.filter(function(item) {
        for (var key in formData) {
            if (item[key] != formData[key])
            return false;
        }
        return true;
    });
    if(filteredData.length > 0){
        console.log("Data size : ",filteredData.length)
        populateTableData(filteredData);
    }else{
        console.log("Data size : ",filteredData.length)
        populateTableData(tableData);
        $("#buttonAlert").addClass('show')
    }
    
    
}

function reset(event) {
    populateTableData(tableData);
}

filterBtn.on("click",filterData);
resetBtn.on("click",reset);

/*
console.log("Row X " + date)
tableData.forEach(element => {
    var newRow   = tableRef.insertRow();
    var dateCell  = newRow.insertCell(0);
    var cityCell  = newRow.insertCell(1);
    var stateCell  = newRow.insertCell(2);
    var countryCell  = newRow.insertCell(3);
    var shapeCell  = newRow.insertCell(4);
    var durationCell  = newRow.insertCell(5);
    var commentsCell  = newRow.insertCell(6);
    // Append a text node to the cell
    var dateText  = document.createTextNode(element.date);
    var cityText  = document.createTextNode(element.city.charAt(0).toUpperCase() + element.city.slice(1));
    var stateText  = document.createTextNode(element.state.toUpperCase());
    var countryText  = document.createTextNode(element.country.toUpperCase());
    var shapeText  = document.createTextNode(element.shape.charAt(0).toUpperCase() + element.shape.slice(1));
    var durationText  = document.createTextNode(element.durationMinutes);
    var commentsText  = document.createTextNode(element.comments);
    dateCell.appendChild(dateText);
    cityCell.appendChild(cityText);
    stateCell.appendChild(stateText);
    countryCell.appendChild(countryText);
    shapeCell.appendChild(shapeText);
    durationCell.appendChild(durationText);
    commentsCell.appendChild(commentsText);
});*/


