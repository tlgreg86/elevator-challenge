require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;
const Person = require('../person').default;

describe('Person', function() {
  let person = new Person({ name: "Brittany", currentFloor: 2, dropOffFloor: 5 });

    it('should have initial properties', () => {
      assert.equal(person.name, 'Brittany');
      assert.equal(person.currentFloor, 2);
      assert.equal(person.dropOffFloor, 5);
    });
})

describe('Elevator', function() {
  let elevator = new Elevator();

  beforeEach(function() {
    elevator.reset();
  });

  it('should reset values', () => {
    elevator.currentFloor = 5;
    elevator.requests = [{}];
    elevator.currentRiders = [{ name:'John' }];
    elevator.stops = 1;
    elevator.traversed = 5;

    assert.equal(elevator.currentFloor, 5);
    assert.deepEqual(elevator.requests, [{}]);
    assert.deepEqual(elevator.currentRiders, [{ name:'John' }]);
    assert.equal(elevator.stops, 1);
    assert.equal(elevator.traversed, 5);

    elevator.reset();

    assert.equal(elevator.currentFloor, 0);
    assert.deepEqual(elevator.requests, []);
    assert.deepEqual(elevator.currentRiders, []);
    assert.equal(elevator.stops, 0);
    assert.equal(elevator.traversed, 0);
  })

  it('should add a new riders request', () => {
    let mockUser = new Person({ name: "John", currentFloor: 8, dropOffFloor: 3 });

    elevator.newRequest(mockUser);

    assert.deepEqual(elevator.requests, [8, 3])
    assert.deepEqual(elevator.currentRiders, [{ name: "John", currentFloor: 8, dropOffFloor: 3 }])
  })

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = new Person({ name: "Brittany", currentFloor: 2, dropOffFloor: 5 });

    elevator.newRequest(mockUser)
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.traversed, 3);
    assert.equal(elevator.stops, 1)
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = new Person({ name: "Brittany", currentFloor: 8, dropOffFloor: 3 });

    elevator.newRequest(mockUser)
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.traversed, 5);
    assert.equal(elevator.stops, 1)
  });

  it('should be able to pick up and drop multiple passengers', () => {
    let mockUser1 = new Person({ name: "Travis", currentFloor: 3, dropOffFloor: 9 });
    let mockUser2 = new Person({ name: "Jackie", currentFloor: 6, dropOffFloor: 2 });

    elevator.newRequest(mockUser1);
    assert.equal(elevator.currentRiders.length, 1);

    elevator.newRequest(mockUser2);
    assert.equal(elevator.currentRiders.length, 2);

    elevator.goToFloor();

    assert.equal(elevator.currentRiders.length, 0);
    assert.equal(elevator.currentFloor, 2);
    assert.equal(elevator.stops, 4);
    assert.equal(elevator.traversed, 10);
  })
});
