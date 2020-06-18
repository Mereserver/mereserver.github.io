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
        // this.scooters = [
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Denied,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "MI", 50, Scooter.Status.Charging, Scooter.Permission.Denied,
        //         new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z")),
        //     new Scooter("XX:YY:ZZ:QQ", "MI", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
        //         new Location("Latvia", "Valmiera", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Offline, Scooter.Permission.Denied,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "MI", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charged, Scooter.Permission.Denied,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "MI", 50, Scooter.Status.Offline, Scooter.Permission.Denied,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Denied,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Denied,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"))
        // ];

        this.scooters = [
            new Scooter("FE:45:6E:F7", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
                new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("DD:29:F4:A8", "MI", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
                new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("A5:9D:1E:AF", "MI", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
                new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("DE:17:AA:7F", "Segway", 50, Scooter.Status.Offline, Scooter.Permission.Denied,
                new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("8E:B7:5C:D2", "MI", 50, Scooter.Status.Charging, Scooter.Permission.Granted,    new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("FE:A4:1C:F5", "Segway", 50, Scooter.Status.Charged, Scooter.Permission.Denied,  new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("B2:51:B5:BF", "MI", 50, Scooter.Status.Offline, Scooter.Permission.Denied,      new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("48:DC:C3:23", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("43:88:8C:A3", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("5E:6A:99:8E", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("E6:9E:C5:44", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("DF:BE:C7:1E", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("59:65:8F:7F", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("E8:CC:93:94", "Segway", 50, Scooter.Status.Charged, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("BF:6B:38:37", "Segway", 50, Scooter.Status.Charged, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("E7:18:52:91", "Segway", 50, Scooter.Status.Charged, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("B3:35:47:FF", "Segway", 50, Scooter.Status.Charged, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("87:56:9F:26", "Segway", 50, Scooter.Status.Charged, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("37:4D:B3:A8", "Segway", 50, Scooter.Status.Charged, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("3C:49:3A:C1", "Segway", 50, Scooter.Status.Charged, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17]))
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