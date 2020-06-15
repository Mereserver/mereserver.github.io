function Report(date, location, chargingQty, totalPower, totalTime, totalPrice){
    if(typeof date == "string") {
        this.date = DateTimeParser.FromString(date);
    }
    else
        this.date = date;

    this.location = location;
    this.chargingQty = chargingQty;
    this.totalPower = totalPower;
    this.totalTime = totalTime;
    this.totalPrice = totalPrice;
}

Object.defineProperty(Report.prototype, "getDateString", {
    get() {
        return DateTimeParser.ToString(this.date);
    }
});


let Reports = (function () {
    function Reports() {
        this.objs = [
            new Report("10.04.2020", new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"),
                1356, 159, "146 h", "100$"
                ),
            new Report("10.04.2020", new Location("Ukraine", "Kiev", "Pushkin street 34-2", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"),
                1356, 159, "146 h", "100$"
            ),
            new Report("10.04.2020", new Location("Ukraine", "Kiev", "Pushkin street 34-1", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"),
                1356, 159, "146 h", "100$"
            ),
            new Report("01.06.2020", new Location("Ukraine", "Kiev", "Pushkin street 34-7", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"),
                1356, 159, "146 h", "100$"
            ),
            new Report("15.06.2020", new Location("Ukraine", "Kiev", "Pushkin street 34-4", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"),
                1356, 159, "146 h", "100$"
            ),
            new Report("15.06.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                1356, 159, "146 h", "100$"
            ),
            new Report("15.06.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                1356, 159, "146 h", "100$"
            ),
            new Report("15.06.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                1356, 159, "146 h", "100$"
            ),
            new Report("07.07.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                1356, 159, "146 h", "100$"
            ),
            new Report("02.05.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                1356, 159, "146 h", "100$"
            ),
            new Report("06.05.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                1356, 159, "146 h", "100$"
            ),
            new Report("05.10.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                1356, 159, "146 h", "100$"
            ),
            new Report("25.05.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                1356, 159, "146 h", "100$"
            )
        ];
    }

    Reports.prototype.GetObjects = function () {
        return this.objs;
    }

    Reports.prototype.GetObjectsByCityAndDate = function(city, start, end) {
        let objs = this.GetObjects();

        if(city != "All") {
            objs = objs.filter(x => x.location.city == city);
        }

        objs = objs.filter(x => DateTimeParser.InRangeDate(start, end, x.date));

        return objs;
    }



    return Reports;
})();