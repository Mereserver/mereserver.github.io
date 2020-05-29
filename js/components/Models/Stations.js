
const Status = {
  Info : Object.freeze({
    Occupied: "Occupied",
    Available: "Available",
    Unavailable: "Available"
  }),
  Type : Object.freeze({"Online": "Online", "Offline": "Offline"})
}

function Slot(id, info, status, chargeLevel) {
  this.id = id;
  this.info = info;
  this.status = status;
  this.chargeLevelVal = chargeLevel;
}

Slot.prototype.Clone = function() {
  let s = this;
  return new Slot(s.id, s.info, s.status, s.chargeLevelVal);
}

Object.defineProperty(Slot.prototype, "chargeLevel", {
  get() {
    return this.chargeLevelVal == -1 ? "-" : this.chargeLevelVal;
  }
});

function Location(country, city, appendix, geopos) {
  this.country = country;
  this.city = city;
  this.appendix = appendix;
  this.url = geopos;
}

Object.defineProperty(Location.prototype, "GetString", {
  get() {
    return this.city + ", " + this.appendix
  }
});

// Station //
function Station() {
  let args = Array.from(arguments);

  this.selected = false;

  this.stationId = args[0];
  this.slots = args[1];

  this.location = args[2];
}

Object.defineProperty(Station.prototype, "GetStatus", {
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
  return new Station(s.stationId, s.slots.map(x => x.Clone()), s.location);
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
  const titles = ["default", "Add station", "Update station"];

  const StateType = Aggregator.StateType;

  function StationsAggregator() {

    this.stations = [
      new Station("XX:YY:ZZ:QQ", [
          new Slot("XX:YY:ZZ:WW", Status.Info.Occupied, Status.Type.Online, 50),
          new Slot("XX:YY:ZZ:EE",Status.Info.Unavailable, Status.Type.Online, -1),
          new Slot("XX:YY:ZZ:SS",Status.Info.Occupied, Status.Type.Online, 16)
      ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:22:QQ", [
        new Slot("XX:YY:ZZ:WW", Status.Info.Available, Status.Type.Online, -1),
        new Slot("XX:YY:ZZ:EE",Status.Info.Occupied, Status.Type.Online, 78),
        new Slot("XX:YY:ZZ:SS",Status.Info.Unavailable, Status.Type.Online, -1)
      ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:33:QQ", [
        new Slot("XX:YY:ZZ:WW", Status.Info.Unavailable, Status.Type.Offline, -1),
        new Slot("XX:YY:ZZ:EE",Status.Info.Occupied, Status.Type.Online, 50),
        new Slot("XX:YY:ZZ:SS",Status.Info.Available, Status.Type.Online, -1)
      ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:44:QQ", [
        new Slot("XX:YY:ZZ:WW", Status.Info.Occupied, Status.Type.Online, 11),
        new Slot("XX:YY:ZZ:EE",Status.Info.Occupied, Status.Type.Online, 50),
        new Slot("XX:YY:ZZ:SS",Status.Info.Occupied, Status.Type.Online, 50)
      ], new Location("Latvia", "Valmiera", "Some street 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:44:QQ", [
        new Slot("XX:YY:ZZ:WW", Status.Info.Occupied, Status.Type.Online, 16),
        new Slot("XX:YY:ZZ:EE",Status.Info.Occupied, Status.Type.Offline, 17),
        new Slot("XX:YY:ZZ:SS",Status.Info.Occupied, Status.Type.Online, 18)
      ], new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"))
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

