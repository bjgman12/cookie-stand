'use strict';

// make object
var Seattle = {
  name: 'Seattle',
  minCustomer: 23,
  maxCustomer: 65,
  avgSale: 6.3,
  salesActual: [],
  hoursOfOperation: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
  salesSum: 0

};

var Tokyo = {
  name: 'Tokyo',
  minCustomer: 3,
  maxCustomer: 24,
  avgSale: 1.2,
  salesActual: [],
  hoursOfOperation: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
  salesSum: 0

};
var Dubai = {
  name: 'Dubai',
  minCustomer: 11,
  maxCustomer: 38,
  avgSale: 3.7,
  salesActual: [],
  hoursOfOperation: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
  salesSum: 0

};

var Paris = {
  name: 'Paris',
  minCustomer: 20,
  maxCustomer: 38,
  avgSale: 2.3,
  salesActual: [],
  hoursOfOperation: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
  salesSum: 0

};

var Lima = {
  name: 'Lima',
  minCustomer: 2,
  maxCustomer: 16,
  avgSale: 4.6,
  salesActual: [],
  hoursOfOperation: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
  salesSum: 0

};
var Sites = [Seattle, Tokyo, Dubai, Paris, Lima];
function compileSiteSales(siteArr) {
  var hourSales = 0;
  var totalSales = 0;
  // calculate and store simulated amounts of cookies purchased for each hour 
  for (var i = 0; i < siteArr.hoursOfOperation.length; i++) {
    var hourlyCustomers = (Math.floor(Math.random() * (siteArr.maxCustomer - siteArr.minCustomer)) + siteArr.minCustomer) + 1;
    hourSales = hourlyCustomers * siteArr.avgSale;
    siteArr.salesSum += hourlyCustomers * siteArr.avgSale;
    totalSales += hourSales;
    //store result in an array
    siteArr.salesActual.push(parseInt(hourSales));
  }

  //target
  var siteContainer = document.getElementById('siteContainer');

  //create
  var newSite = document.createElement('div');
  var siteName = document.createElement('h2');
  siteName.textContent = `${siteArr.name} Sales Data`;
  var salesList = document.createElement('ul');

  //append
  siteContainer.append(newSite);
  newSite.append(siteName);
  newSite.append(salesList);
  for (i = 0; i <= siteArr.salesActual.length; i++) {
    if (i < siteArr.salesActual.length) {
      var salesItem = document.createElement('li');
      salesItem.textContent = `${siteArr.hoursOfOperation[i]}: ${siteArr.salesActual[i]} Cookies`;
      salesList.append(salesItem);
    } else {
      salesItem = document.createElement('li');
      salesItem.textContent = `Total: ${parseInt(totalSales)} Cookies`;
      salesList.append(salesItem);

    }

  }
}
for (var i = 0; i < Sites.length; i++) {
  compileSiteSales(Sites[i]);
}
