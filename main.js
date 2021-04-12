weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

orders = [
    {
      "orderId": 554,
      "creationDate": "2017-03-25T10:35:20Z",
      "orderLines": [
        { "productId": 9872, "name": "Pencil", "quantity": 3, "unitPrice": 3.00 }
      ]
    },
    {
      "orderId": 555,
      "creationDate": "2017-03-25T11:24:20Z",
      "orderLines": [
        { "productId": 9872, "name": "Pencil", "quantity": 1, "unitPrice": 3.00 },
        { "productId": 1746, "name": "Eraser", "quantity": 1, "unitPrice": 1.00 }
      ]
    },
    {
      "orderId": 453,
      "creationDate": "2017-03-27T14:53:12Z",
      "orderLines": [
        { "productId": 5723, "name": "Pen", "quantity": 4, "unitPrice": 4.22 },
        { "productId": 9872, "name": "Pencil", "quantity": 3, "unitPrice": 3.12 },
        { "productId": 3433, "name": "Erasers Set", "quantity": 1, "unitPrice": 6.15 }
      ]
    },
    {
      "orderId": 431,
      "creationDate": "2017-03-20T12:15:02Z",
      "orderLines": [
        { "productId": 5723, "name": "Pen", "quantity": 7, "unitPrice": 4.22 },
        { "productId": 3433, "name": "Erasers Set", "quantity": 2, "unitPrice": 6.15 }
      ]
    },
    {
      "orderId": 690,
      "creationDate": "2017-03-26T11:14:00Z",
      "orderLines": [
        { "productId": 9872, "name": "Pencil", "quantity": 4, "unitPrice": 3.12 },
        { "productId": 4098, "name": "Marker", "quantity": 5, "unitPrice": 4.50 }
      ]
    }
  ];
  
var productId = 9872;

var averageMap = {};
for(var i=0 ; i<weekdays.length ; i++){
  averageMap[weekdays[i]] = 0;
}

var startDate = null;
var endDate = null;

for(var i=0 ; i<orders.length ; i++){
  var order = orders[i];
  var date = Date.parse(order.creationDate);

  // Calculate the number of weeks, to later calculate the average
  if(startDate == null || startDate > date){
    startDate = date;
  }

  if(endDate == null || endDate < date){
    endDate = date;
  }

  // Sum all the sales by product
  var dayOfTheWeek = new Date().getDay();

  for(var j=0 ; j<order.orderLines.length ; j++){
    var orderLine = order.orderLines[j];

    if(orderLine.productId == productId){
      averageMap[Object.keys(averageMap)[dayOfTheWeek]] += orderLine.quantity;
    }
  }
}


var weeksDiff = Math.round((endDate - startDate) / 1000 / 60 / 60 / 24 / 7); 

for(var i=0 ; i<Object.keys(averageMap).length ; i++){
  averageMap[Object.keys(averageMap)[i]] = Math.round(averageMap[Object.keys(averageMap)[i]] / weeksDiff);
}


console.log(JSON.stringify(averageMap));
