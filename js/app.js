'use strict';
var hoursOfOperation = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
var traffic = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];

var tableContainer = document.getElementById('tableContainer');
var siteTable = document.createElement('table');
function baseTable() {
  var tableRow = document.createElement('tr');
  var tableCell = document.createElement('th');
  tableContainer.append(siteTable);
  siteTable.append(tableRow);
  tableRow.append(tableCell);
  for (var i = 0; i < hoursOfOperation.length; i++) {
    tableCell.textContent = `${hoursOfOperation[i]}`;
    tableCell = document.createElement('th');
    tableRow.append(tableCell);
  }
  tableCell.textContent = ``;
  tableRow.prepend(tableCell);
  tableCell = document.createElement('th');
  tableCell.textContent = 'Daily Location Total';
  tableRow.append(tableCell);
}
baseTable();

function Store(name, minCustomer, maxCustomer, avgSale) {
  this.name = name;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgSale = avgSale;
  this.salesActual = [];
  this.salesSum = 0;
  this.staffPerHour = [];
}

Store.prototype.compileSiteSales = function () {
  var hourSales = 0;
  // calculate and store simulated amounts of cookies purchased for each hour 
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var hourlyCustomers = ((Math.floor(Math.random() * (this.maxCustomer - this.minCustomer)) + this.minCustomer) + 1) * traffic[i];
    hourSales = hourlyCustomers * this.avgSale;
    this.salesSum += hourlyCustomers * this.avgSale;
    //store result in an array
    this.salesActual.push(parseInt(hourSales));
  }
};

Store.prototype.renderTable = function () {
  this.compileSiteSales();
  var newRow = document.createElement('tr');
  var newCell = document.createElement('td');
  newCell.textContent = `${this.name}`;
  siteTable.append(newRow);
  newRow.append(newCell);
  for (var i = 0; i <= hoursOfOperation.length; i++) {
    newCell = document.createElement('td');
    newCell.textContent = `${this.salesActual[i]} `;
    newRow.append(newCell);
  }
  newCell.textContent = `${parseInt(this.salesSum)} Cookies`;
  newRow.append(newCell);
};
Store.prototype.staffReq = function () {
  var hourStaff = 0;
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var hourlyCustomers = ((Math.floor(Math.random() * (this.maxCustomer - this.minCustomer)) + this.minCustomer) + 1) * traffic[i];
    hourStaff = (this.salesActual[i] / 20) + 1;
    if (hourStaff < 2) {
      hourStaff = 2;
    }
    this.staffPerHour.push(parseInt(hourStaff));
  }
};
//new table render method

Store.prototype.renderStaffTable = function () {
  this.staffReq();
  var newRow = document.createElement('tr');
  var newCell = document.createElement('td');
  newCell.textContent = `${this.name}`;
  siteTable.append(newRow);
  newRow.append(newCell);
  for (var i = 0; i < hoursOfOperation.length; i++) {
    newCell = document.createElement('td');
    newCell.textContent = `${this.staffPerHour[i]} `;
    newRow.append(newCell);
  }
};


var sites = [];
var seattle = new Store('Seattle', 23, 65, 6.3);
sites.push(seattle);
var tokyo = new Store('Tokyo', 3, 24, 1.2);
sites.push(tokyo);
var dubai = new Store('Dubai', 11, 38, 3.7);
sites.push(dubai);
var paris = new Store('Paris', 20, 38, 2.3);
sites.push(paris);
var lima = new Store('Lima', 2, 16, 4.6);
sites.push(lima);

seattle.renderTable();
tokyo.renderTable();
dubai.renderTable();
paris.renderTable();
lima.renderTable();

var hourlyTotals = [];
function sumHour(totalsArray) {
  var total = 0;
  for (var j = 0; j < hoursOfOperation.length; j++) {
    var hour = 0;
    for (var i = 0; i < sites.length; i++) {
      hour += sites[i].salesActual[j];
    }
    totalsArray.push(hour);
  }
  for (i = 0; i < sites.length; i++) {
    total += sites[i].salesSum;

  }
  return Math.ceil(total);
}
var total = sumHour(hourlyTotals);
function renderEnd() {
  var lastRow = document.createElement('tr');
  var rowData = document.createElement('td');
  rowData.textContent = 'Hourly Totals';
  siteTable.append(lastRow);
  lastRow.append(rowData);
  for (var i = 0; i < hoursOfOperation.length; i++) {
    rowData = document.createElement('td');
    rowData.textContent = `${hourlyTotals[i]} Cookies`;
    lastRow.append(rowData);
  }
  rowData = document.createElement('td');
  rowData.textContent = `${total} Cookies`;
  lastRow.append(rowData);
}
renderEnd();

siteTable = document.createElement('table');

function newTable() {
  var tableRow = document.createElement('tr');
  var tableCell = document.createElement('th');
  tableContainer.append(siteTable);
  siteTable.append(tableRow);
  tableRow.append(tableCell);
  for (var i = 0; i < hoursOfOperation.length; i++) {
    tableCell.textContent = `${hoursOfOperation[i]}`;
    tableCell = document.createElement('th');
    tableRow.append(tableCell);
  }
  tableCell.textContent = 'Staffing';
  tableRow.prepend(tableCell);
}
newTable();

seattle.renderStaffTable();
tokyo.renderStaffTable();
dubai.renderStaffTable();
paris.renderStaffTable();
lima.renderStaffTable();

var staffing = [];
function calcTotStaff() {
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var staff = 0;
    for (var j = 0; j < sites.length; j++) {
      staff += (sites[j].staffPerHour[i]);
    }
    staffing.push(Math.ceil(staff));
  }
}

function renderEndStaff() {
  calcTotStaff();
  var lastRow = document.createElement('tr');
  var rowData = document.createElement('td');
  rowData.textContent = 'Global Staffing';
  siteTable.append(lastRow);
  lastRow.append(rowData);
  for (var i = 0; i < hoursOfOperation.length; i++) {
    rowData = document.createElement('td');
    rowData.textContent = `${staffing[i]} Staff`;
    lastRow.append(rowData);
  }
}
renderEndStaff();


