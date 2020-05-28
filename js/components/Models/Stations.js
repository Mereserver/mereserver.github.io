function Slot(id) {
  this.id = id;
}

function Location(country, city, appendix) {
  this.country = country;
  this.city = city;
  this.appendix = appendix;
}

// Station //
function Station() {
  let args = Array.from(arguments);

  this.selected = false;

  this.stationId = args[0];
  this.slotId = args[1];

  this.info = args[2];
  this.status = args[3];  // 1 - ok, 0 - disabled, -1  - error

  this.chargeLevel = args[4];

  this.location = args[5];

}

Object.defineProperty(Station.prototype, "GetStatusClass", {
  get: function () {
    if (this.status == 0) return "text-secondary";
    else if (this.status == 1) return "text-success";
    else if (this.status == -1) return "text-danger";
    else return "text-secondary";
  }
});

// Implement interface function //
Station.prototype.Clone = function() {
  let s = this;
  return new Station(s.stationId, s.name, s.totalSlots, s.remainSlots
    , s.totalPower, s.currentPower, s.location, s.status);
}

// end Station //

// Factory //
let Factory = {
  CreateDefaultStation() {
    return new Station("", "", "", "", "", "", "", 0);
  }
};
// end Factory //

// StationsAggregator //
let StationsAggregator = (function () {

  const StatusInfo = Object.freeze({"Occupied": 0, "Available": 1, "Unavailable": 2});
  const StatusType = Object.freeze({"Online": 1, "Offline": 0});

  const titles = ["default", "Add station", "Update station"];

  const StateType = Aggregator.StateType;

  function StationsAggregator() {

    this.stations = [
      new Station(1, "XX:YY:ZZ:QQ", [
          new Slot("XX:YY:ZZ:WW"),
          new Slot("XX:YY:ZZ:EE"),
          new Slot("XX:YY:ZZ:SS")
      ], StatusInfo.Occupied, StatusType.Online, 50, new Location("Riga", "Elinos", "34-3"))
    ];
  }

  // Implement interface functions //
  StationsAggregator.prototype.GetTitles = function () {
    return titles;
  }

  StationsAggregator.prototype.GetObjects = function () {
    return this.stations;
  }

  StationsAggregator.prototype.CreateDefaultModel = function () {
    return Factory.CreateDefaultStation();
  }

  return StationsAggregator;
})();
// end StationsAggregator //

