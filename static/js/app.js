// from data.js
var tableData = data;

// YOUR CODE HERE!


var tbody = d3.select("#ufo-tbody");

function populateTableData(data){
    data.map(data => {
        var row = tbody.append("tr");

        row.append("td").text(data.datetime)
        row.append("td").text(data.city).attr("class","text-capitalize");
        row.append("td").text(data.state).attr("class","text-uppercase");
        row.append("td").text(data.country).attr("class","text-uppercase");
        row.append("td").text(data.shape).attr("class","text-capitalize");
        row.append("td").text(data.durationMinutes);
        row.append("td").text(data.comments);

    });
}

populateTableData(tableData);

function filterData(event){
    var date = d3.select("#datetime").property("value");
    var filteredData = tableData.filter(ufo => ufo.datetime === date);
    tbody.text("");
    populateTableData(filteredData);
    
}
var filterBtn = d3.select("#filter-btn");
filterBtn.on("click",filterData);

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


