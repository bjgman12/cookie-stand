'use strict';

// make object
var Seattle = {
  minCustomer: 23,
  maxCustomer: 65,
  avgSale: 6.3,
  salesActual: [],
  hoursOfOperation: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
  salesSum: 0,

};



var hourSales = 0;
// calculate and store simulated amounts of cookies purchased for each hour 
for (var i = 0; i <= 13; i++) {
  var hourlyCustomers = (Math.floor(Math.random() * (Seattle.maxCustomer - Seattle.minCustomer)) + Seattle.minCustomer);
  hourSales = hourlyCustomers * Seattle.avgSale;
  Seattle.salesSum += hourlyCustomers * Seattle.avgSale;
  //store result in an array
  Seattle.salesActual.push(parseInt(hourSales));
}


var siteContainer = document.getElementById('siteContainer');

var seattleSite = document.createElement('div');
var salesList = document.createElement('ul');
siteContainer.append(seattleSite);
seattleSite.append(salesList);

for ( i = 0; i < Seattle.salesActual.length; i++) {
  var salesItem = document.createElement('li');
  salesItem.textContent = `${Seattle.hoursOfOperation[i]}: ${Seattle.salesActual[i]} cookies`;
  salesList.append(salesItem);
}

