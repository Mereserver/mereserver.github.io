function StationsRatingModel(location, qtyChargingEvents, date) {
    this.location = location;
    this.qtyChargingEvents = qtyChargingEvents;
    if(typeof date == "string") {
        this.date = DateTimeParser.FromString(date);
    }
    else
        this.date = date;
}

Object.defineProperty(StationsRatingModel.prototype, "GetLocation", {
    get() {
        return this.location;
    }
});

Object.defineProperty(StationsRatingModel.prototype, "GetChargingEventsQty", {
    get() {
        return this.qtyChargingEvents;
    }
});

let StationsRating = (function () {
    function StationsRating() {
        this.objs = [
            new StationsRatingModel(new Location("Latvia", "Riga", "Elinos 34-1", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),7567, "10.04.2019"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Elinos 34-2", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),3456, "10.04.2018"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),7568, "07.01.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Elinos 34-4", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),75169, "03.02.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Elinos 34-5", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),75170, "01.03.2020"),
            new StationsRatingModel(new Location("Latvia", "Valmiera", "Elinos 34-6", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),75171, "10.04.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Elinos 34-7", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),75172, "01.05.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Elinos 34-8", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),75173, "02.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Valmiera", "Elinos 33-8", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),75173, "01.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Elinos 34-9", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),75174, "25.05.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Elinos 34-10", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),75175, "26.05.2020"),
            new StationsRatingModel(new Location("Ukraine", "Kiev", "Pushkin street 34-11", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"),7576, "10.04.2020")
        ];
    }

    StationsRating.prototype.GetObjects = function () {
        return this.objs;
    }

    StationsRating.prototype.GetObjectsByCountryCity = function(country, city) {
        let objs = this.GetObjects();

        if(country != "All") {
            objs = objs.filter(x => x.location.country == country);
        }

        if(city != "All") {
            objs = objs.filter(x => x.location.city == city);
        }

        return objs;
    }

    StationsRating.prototype.GetObjectsByCountryCityAndDate = function(country, city, start, end) {
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

    return StationsRating;
})();