export default class Elevator {
  constructor() {
    this.currentFloor = 0 // 0 = lobby
    this.currentRiders = []
    this.requests = []
    this.stops = 0
    this.traversed = 0
  }

  reset() {
    this.currentFloor = 0 // 0 = lobby
    this.currentRiders = []
    this.requests = []
    this.stops = 0
    this.traversed = 0
  }

  newRequest(user) {
    this.requests.push(user.dropOffFloor)
    this.currentRiders.push(user.currentFloor, user.dropOffFloor)
  }

  goToFloor() {
    // for (let i = 0; i < this.currentRiders.length; i++) {
    while (this.currentRiders.length) {

      if (this.currentRiders.length > 1) {
        this.currentFloor = this.currentRiders[0].dropOffFloor;
        this.traversed += Math.abs(this.currentRiders[0].currentFloor - this.currentFloor);
        this.stops++
        this.currentRiders.shift()
      } else if (this.currentRiders.length === 1) {
        this.currentFloor = this.currentRiders[0].dropOffFloor;
        this.traversed += Math.abs(this.currentRiders[0].currentFloor - this.currentFloor);
        this.stops++;
        this.currentRiders.shift()
      }
    }
  }

}
