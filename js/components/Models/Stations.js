Slot.Satatus = Object.freeze({
  Occupied: "Occupied",
  Available: "Available",
  Unavailable: "Unavailable"
});

Slot.Info = Object.freeze({Online: "Online", Offline: "Offline"});


function Slot(id, status, info, chargeLevel) {
  this.id = id;
  this.status = status;
  this._info = info;
  this.chargeLevelVal = chargeLevel;
  this.selected = false;
}

Object.defineProperty(Slot.prototype, "status", {
  set(val) {
    this._status = val;
  },
  get() {
    return this._info ? this._status : Slot.Satatus.Unavailable;
  }
});

Object.defineProperty(Slot.prototype, "info", {
  get() {
    return this._info;
  },
  set(value) {
    this._info = value;
  }
});

Object.defineProperty(Slot.prototype, "infoString", {
  get() {
    return this._info ? Slot.Info.Online :  Slot.Info.Offline;
  }
})


Slot.prototype.Clone = function() {
  let s = this;
  return new Slot(s.id, s.status, s.info, s.chargeLevelVal);
}

Slot.Default = function() {
  return new Slot("", Slot.Satatus.Unavailable, false, 0)
}



Object.defineProperty(Slot.prototype, "chargeLevel", {
  get() {
    return this.chargeLevelVal == -1 ? "-" : this.chargeLevelVal;
  }
});

function Location(country, city, appendix, geopos) {
  this.country = country || '';
  this.city = city  || '';
  this.appendix = appendix  || '';

  this.geopos = geopos  || '';
}

Location.prototype.GetGeoPos = function () {
  return this.geopos.map(x => x);
}

Object.defineProperty(Location.prototype, "url", {
  get() {
    if(typeof this.geopos == "string") {
      return this.geopos;
    }

    let pos = [56.9500885, 24.0319015];
    if(typeof this.geopos == "object" && this.geopos.length >= 2) {
      pos = this.geopos;
    }

    return "https://www.google.ru/maps/place/@" + pos.join(",") + ",9z/";
  }
});

Location.CreateDefault = function () {
  return new Location();
};

// Implement interface function //
Location.prototype.Clone = function() {
  let s = this;
  return new Location(s.country, s.city, s.appendix, s.url);
}

Object.defineProperty(Location.prototype, "GetString", {
  get() {
    return this.appendix.trim().length > 0 ? this.city + ", " + this.appendix : this.city;
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
  return new Station(s.stationId, s.slots.map(x => x.Clone()), s.location.Clone());
}

// end Station //

// StationFactory //
let StationFactory = {
  CreateDefaultStation() {
    return new Station("", [], Location.CreateDefault())
  }
};
// end StationFactory //

// StationsAggregator //
let StationsAggregator = (function () {
  const titles = ["default", "Add station", "Update station"];

  function StationsAggregator() {

    this.stations = [
      new Station("XX:YY:ZZ:QQ", [
          new Slot("XX:YY:ZZ:WW", Slot.Satatus.Occupied, true, 50),
          new Slot("XX:YY:ZZ:EE",Slot.Satatus.Unavailable, false, -1),
          new Slot("XX:YY:ZZ:SS",Slot.Satatus.Occupied, true, 16)
      ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:22:QQ", [
        new Slot("XX:YY:ZZ:WW", Slot.Satatus.Available, true, -1),
        new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, true, 78),
        new Slot("XX:YY:ZZ:SS",Slot.Satatus.Unavailable, false, -1)
      ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:33:QQ", [
        new Slot("XX:YY:ZZ:WW", Slot.Satatus.Unavailable, false, -1),
        new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, true, 50),
        new Slot("XX:YY:ZZ:SS",Slot.Satatus.Available, true, -1)
      ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:44:QQ", [
        new Slot("XX:YY:ZZ:WW", Slot.Satatus.Occupied, true, 11),
        new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, true, 50),
        new Slot("XX:YY:ZZ:SS",Slot.Satatus.Occupied, true, 50)
      ], new Location("Latvia", "Valmiera", "Some street 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
      new Station("XX:YY:44:QQ", [
        new Slot("XX:YY:ZZ:WW", Slot.Satatus.Occupied, true, 16),
        new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, false, 17),
        new Slot("XX:YY:ZZ:SS",Slot.Satatus.Occupied, true, 18)
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

  StationsAggregator.prototype.GetObjectsByCountryCity = function(country, city) {
    let stations = this.GetObjects();

    if(country != "All") {
      stations = stations.filter(x => x.location.country == country);
    }

    if(city != "All") {
      stations = stations.filter(x => x.location.city == city);
    }

    return stations;
  }

  StationsAggregator.prototype.CreateDefaultModel = function () {
    return StationFactory.CreateDefaultStation();
  }

  return StationsAggregator;
})();
// end StationsAggregator //

