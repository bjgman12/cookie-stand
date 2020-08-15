'use strict';
//Local Object Storage 
// https://www.youtube.com/watch?v=AUOzvFzdIk4
// var newObj = {
//   name:'brandon',
//   age:56
// };

// var newObjSerialized = JSON.stringify(newObj);
// localStorage.setItem('newObj',newObjSerialized);
// var newObjNormalized = JSON.parse(localStorage.getItem('newObj'));
// console.log(newObjNormalized);

var hoursOfOperation = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
var traffic = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
var orderArr = [];
var orderId = 0;
var orderTarget = document.getElementById('main');
var rendCount = 0;
var keyArr = [];
var valArr = [];
var orderProcArr = [];
var tableCount = 0;



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
  tableCell.textContent = 'Daily';
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
function CartItem(orderId, firstName, lastName, phoneNum, email, street, zip, city, state, ccNum, ccExp, ccZip, ccCcv, quantCook) {
  this.orderId = orderId;
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNum = phoneNum;
  this.email = email;
  this.street = street;
  this.zip = zip;
  this.city = city;
  this.state = state;
  this.ccNum = ccNum;
  this.ccExp = ccExp;
  this.ccZip = ccZip;
  this.ccCcv = ccCcv;
  this.quantCook = quantCook;
}

// var newOrder = {
//  document.getElementById('firstName').value,
//  document.getElementById('lastName').value,
//  document.getElementById('phoneNum').value,
//  document.getElementById('email').value,
//  document.getElementById('street').value,
//  document.getElementById('zip').value,
//  document.getElementById('city').value,
//  document.getElementById('state').value,
//  document.getElementById('ccNum').value,
//  document.getElementById('ccExp').value,
//  document.getElementById('ccZip').value,
//  document.getElementById('ccCcv').value,
//  document.getElementById('quantCook').value,
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
  newCell.textContent = `${parseInt(this.salesSum)} Units`;
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
    rowData.textContent = `${hourlyTotals[i]} Units`;
    lastRow.append(rowData);
  }
  rowData = document.createElement('td');
  rowData.textContent = `${total} Units`;
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

// button

function orderLink() {
  window.open('orderForm.html', '_self');
  // self opens window in same tab
}


function addToCart() {
  var order = new CartItem(
    orderId,
    document.getElementById('firstName').value,
    document.getElementById('lastName').value,
    document.getElementById('phoneNum').value,
    document.getElementById('email').value,
    document.getElementById('street').value,
    document.getElementById('zip').value,
    document.getElementById('city').value,
    document.getElementById('state').value,
    document.getElementById('ccNum').value,
    document.getElementById('ccExp').value,
    document.getElementById('ccZip').value,
    document.getElementById('ccCcv').value,
    document.getElementById('quantCook').value);
  // Store in local storage
  orderArr.push(order);
  orderId++;
}

function orderFin() {

  var serializedObj = JSON.stringify(orderArr);
  localStorage.setItem(`serializedObj`, serializedObj);
}

function getOrders() {

  var newOrder = JSON.parse(localStorage.getItem(`serializedObj`));
  console.log(newOrder);
  for (var i = 0; i < newOrder.length; i++) {
    orderProcArr.push(newOrder[i]);
  }
  renderCon();

}

function fillOldest() {
  // removes oldest order
  localStorage.removeItem(`serializedObj${[localStorage.length - (localStorage.length - 1)]}`);
}

function fillLast() {
  // removes oldest order
  localStorage.clear();
  window.open('orders.html', '_self');
}
function renderCon() {

  var table = document.createElement('table');
  table.setAttribute('class', `proc`);
  for (var i = 0; i < orderProcArr.length; i++) {
    keyArr = Object.keys(orderProcArr[rendCount]);
    valArr = Object.values(orderProcArr[rendCount]);
    tableCount++;
    rendCount++;
    for (var j = 0; j < keyArr.length; j++) {
      // console.log(`check ${i}`);
      var tableRow = document.createElement('tr');
      table.append(tableRow);
      var tableHead = document.createElement('th');
      tableHead.textContent = keyArr[j];
      tableRow.append(tableHead);
      tableRow = document.createElement('tr');
      var tableCell = document.createElement('td');
      tableCell.textContent = `${valArr[j]}`;
      tableRow.append(tableCell);
      table.append(tableRow);
    }
  }
  orderTarget.append(table);
  // addFillOrderButton();
}

function fillOrderButton() {
  tableCount--;
  var table = document.getElementById(`table${tableCount}`);
  console.log(table);
  table.setAttribute('class', 'proc');
}

function addFillOrderButton() {

  var table = document.getElementById(`table${tableCount - 1}`);
  var tableRow = document.createElement('tr');
  var tableCell = document.createElement('td');
  var fillOrder = document.createElement('a');
  fillOrder.textContent = 'Fill Order';
  fillOrder.setAttribute('onclick', 'fillOrderButton()');
  tableCell.append(fillOrder);
  tableRow.append(tableCell);
  table.append(tableRow);
}


