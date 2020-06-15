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
            new StationsRatingModel(new Location("Latvia", "Riga", "Elinos 34-1", "https://www.google.ru/maps/place/@56.926993, 24.127669,9z/"),7567, "10.04.2019"),
            new StationsRatingModel(new Location("Latvia", "Valmiera", "Elinos 34-6", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),75171, "10.04.2020"),
            new StationsRatingModel(new Location("Estonia", "Tallin", "Elinos 34-8", "https://www.google.ru/maps/place/@59.369593,24.739754,9z/"),75173, "02.06.2020"),
            new StationsRatingModel(new Location("Finland", "Helsinki", "Elinos 33-8", "https://www.google.ru/maps/place/@60.23163,24.920331,9z/"),75173, "01.06.2020"),
            new StationsRatingModel(new Location("Ukraine", "Kiev", "Pushkin street 34-11", "https://www.google.ru/maps/@50.445262,30.531903,11.67z"),7576, "10.04.2020"),
            new StationsRatingModel(new Location("Poland", "Warsaw", "Elinos 34-10", "https://www.google.ru/maps/place/@52.214339,20.899708,9z/"),75175, "26.05.2020"),
            new StationsRatingModel(new Location("Netherlands", "Amsterdam", "Elinos 34-10", "https://www.google.ru/maps/place/@52.335339,4.946472,9z/"),75175, "26.05.2020"),
            new StationsRatingModel(new Location("France", "Paris", "Elinos 34-10", "https://www.google.ru/maps/place/@48.84592,2.333719,9z/"),75175, "26.05.2020"),
            new StationsRatingModel(new Location("Germany", "Berlin", "Elinos 34-10", "https://www.google.ru/maps/place/@49.922935, 8.849602,9z/"),75175, "26.05.2020"),
            new StationsRatingModel(new Location("Germany", "Frankfurt", "Elinos 34-10", "https://www.google.ru/maps/place/@49.922935, 8.849602,9z/"),75175, "26.05.2020")
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