'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

function getCar(id) {
  for (var i = 0; i < cars.length; i++) {
    if(cars[i].id===id)
    {
      return cars[i];
    }
  }
}

function getRental(id) {
  for (var i = 0; i < rentals.length; i++) {
    if(rentals[i].id===id)
    {
      return rentals[i];
    }
  }
}

//exercise-1-2-3-4
function computePrice(rental) {
  var car = getCar(rental.carId);
  var date1 = new Date(rental.returnDate);
  var date2 = new Date(rental.pickupDate);
  var locationTime = (date1.getTime()-date2.getTime())/8.64e+7+1;

  var discount = 0;
  if(locationTime>1)
  {
    discount = 0.1;
  }
  if(locationTime>4)
  {
    discount = 0.3;
  }
  if(locationTime>10)
  {
    discount = 0.5;
  }

  var dailyOptionPrice=0;
  if(rental.options.deductibleReduction)
  {
    dailyOptionPrice+=4;
  }

  rental.price = locationTime*(car.pricePerDay+dailyOptionPrice)*(1-discount)+car.pricePerKm*rental.distance;

  var commissionPart = rental.price*0.3;
  rental.commission.insurance=commissionPart/2;
  rental.commission.assistance=locationTime;
  rental.commission.drivy=dailyOptionPrice+commissionPart-rental.commission.insurance-rental.commission.assistance;
  return rental;
}
for (var i = 0; i < rentals.length; i++) {
  rentals[i]=computePrice(rentals[i]);
}

//exercise-5
function updateActors()
{
  for (var i = 0; i < actors.length; i++) {
    var actor=actors[i];
    var rental = getRental(actor.rentalId);
    for (var j = 0; j < actor.payment.length; j++) {
      var paymentToDo= actor.payment[j];
      switch (paymentToDo.who) {
        case "driver":
          paymentToDo.amount=rental.price;
          break;
        case "owner":
          paymentToDo.amount=rental.price*0.7;
          break;
        case "insurance":
          paymentToDo.amount=rental.commission.insurance;
          break;
        case "assistance":
          paymentToDo.amount=rental.commission.assistance;
          break;
        case "drivy":
          paymentToDo.amount=rental.commission.drivy;
          break;
        default:
      }
    }
  }
}

updateActors();

//exercise-6

for (var i = 0; i < rentalModifications.length; i++) {
  var modification = rentalModifications[i];
  var rental = getRental(modification.rentalId);

  for (var properties in modification) {
    rental[properties] = modification[properties];
  }
  computePrice(rental);
}

updateActors();

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
