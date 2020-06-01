let Scooter = (function(){
    const Status = {
      Charging : "Charging", Charged : "Charged", Offline: "Offline"
    };
    const Permission = {
        Denied : "Denied", Granted : "Granted"
    };
    function Scooter(id, type, chargeLevel, status, permission, location)
    {
        this.id = id;
        this.type = type;
        this.chargeLevel = chargeLevel;
        this.status = status;
        this.permission = permission;
        this.location = location;
    }

    Scooter.Status = Status;
    Scooter.Permission = Permission;

    return Scooter;
})();

let Scooters = (function() {

    function Scooters() {
        this.scooters = [
            new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Denied,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Scooter("XX:YY:ZZ:QQ", "MI", 50, Scooter.Status.Charging, Scooter.Permission.Denied,
                new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z")),
            new Scooter("XX:YY:ZZ:QQ", "MI", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
                new Location("Latvia", "Valmiera", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Offline, Scooter.Permission.Denied,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Scooter("XX:YY:ZZ:QQ", "MI", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charged, Scooter.Permission.Denied,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Scooter("XX:YY:ZZ:QQ", "MI", 50, Scooter.Status.Offline, Scooter.Permission.Denied,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Denied,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Denied,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"))
        ];
    }

    Scooters.prototype.GetObjects = function () {
        return this.scooters;
    }

    Scooters.prototype.GetObjectsByCountryCityStatus = function(country, city, inStatus) {

        let scooters = this.GetObjects();

        if(country != "All") {
            scooters = scooters.filter(x => x.location.country == country);
        }

        if(city != "All") {
            scooters = scooters.filter(x => x.location.city == city);
        }

        if(inStatus != "All") {
            scooters = scooters.filter(x => x.status == inStatus);
        }

        return scooters;
    }

    return Scooters;
})();