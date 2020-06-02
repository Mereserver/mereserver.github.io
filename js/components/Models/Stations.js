
function Slot(id, status, info, chargeLevel) {
  this.id = id;
  this.status = status;
  this.info = info;
  this.chargeLevelVal = chargeLevel;
}

Slot.Satatus = Object.freeze({
  Occupied: "Occupied",
  Available: "Available",
  Unavailable: "Available"
});

Slot.Info = Object.freeze({"Online": "Online", "Offline": "Offline"});


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
          new Slot("XX:YY:ZZ:WW", Slot.Satatus.Occupied, Slot.Info.Online, 50),
          new Slot("XX:YY:ZZ:EE",Slot.Satatus.Unavailable, Slot.Info.Online, -1),
          new Slot("XX:YY:ZZ:SS",Slot.Satatus.Occupied, Slot.Info.Online, 16)
      ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:22:QQ", [
        new Slot("XX:YY:ZZ:WW", Slot.Satatus.Available, Slot.Info.Online, -1),
        new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, Slot.Info.Online, 78),
        new Slot("XX:YY:ZZ:SS",Slot.Satatus.Unavailable, Slot.Info.Online, -1)
      ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:33:QQ", [
        new Slot("XX:YY:ZZ:WW", Slot.Satatus.Unavailable, Slot.Info.Offline, -1),
        new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, Slot.Info.Online, 50),
        new Slot("XX:YY:ZZ:SS",Slot.Satatus.Available, Slot.Info.Online, -1)
      ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:44:QQ", [
        new Slot("XX:YY:ZZ:WW", Slot.Satatus.Occupied, Slot.Info.Online, 11),
        new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, Slot.Info.Online, 50),
        new Slot("XX:YY:ZZ:SS",Slot.Satatus.Occupied, Slot.Info.Online, 50)
      ], new Location("Latvia", "Valmiera", "Some street 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:44:QQ", [
        new Slot("XX:YY:ZZ:WW", Slot.Satatus.Occupied, Slot.Info.Online, 16),
        new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, Slot.Info.Offline, 17),
        new Slot("XX:YY:ZZ:SS",Slot.Satatus.Occupied, Slot.Info.Online, 18)
      ], new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"))
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

