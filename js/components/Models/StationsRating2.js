let StationsRating2 = (function () {
    function StationsRating2() {
        this.objs = [
            new StationsRatingModel(new Location("Israel", "Tel Aviv-Yafo", "HaCarmel St 48", [32.068683,34.7668583,17]),300, "15.06.2020"),
            new StationsRatingModel(new Location("Israel", "Tel Aviv-Yafo", "Ahad Ha'Am St 43", [32.0655783,34.7735893,17]),310, "12.06.2020"),
            new StationsRatingModel(new Location("Israel", "Tel Aviv-Yafo", "Tchernikhovski St 24", [32.0741166,34.7708168,17]),100, "08.06.2020"),
            new StationsRatingModel(new Location("Israel", "Tel Aviv-Yafo", "Tarsat Ave 2", [32.0725914,34.7767774,17]),120, "06.06.2020"),
            new StationsRatingModel(new Location("Israel", "Tel Aviv-Yafo", "HaGdud Haivri St 8", [32.0603079,34.7727862,17]),370, "02.06.2020")
        ];
    }

    StationsRating2.prototype.GetObjects = function () {
        return this.objs.sort( (x, y) => {
            return y.qtyChargingEvents - x.qtyChargingEvents;
        });
        //return [];
    }

    StationsRating2.prototype.GetObjectsByCountryCity = function(country, city) {
        let objs = this.GetObjects();

        if(country != "All") {
            objs = objs.filter(x => x.location.country == country);
        }

        if(city != "All") {
            objs = objs.filter(x => x.location.city == city);
        }

        return objs;
    }

    StationsRating2.prototype.GetObjectsByCountryCityAndDate = function(country, city, start, end) {
        let objs = this.GetObjects();

        if(country != "All") {
            objs = objs.filter(x => x.location.country == country);
        }

        if(city != "All") {
            objs = objs.filter(x => x.location.city == city);
        }

        objs = objs.filter(x => DateTimeParser.InRangeDate(start, end, x.date));

        return objs;
    }

    StationsRating2.prototype.GetLocations = function () {
        return this.GetObjects().map( x => x.location);
    }

    return StationsRating2;
})();