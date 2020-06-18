function Billing(id,date,type,totalPower,totalTime,totalPrice,location) {
    this.id = id;

    if(typeof date == "string") {
        this.date = DateTimeParser.FromString(date);
    }
    else
        this.date = date;

    this.type = type;
    this.totalPower = totalPower;
    this.totalTime = totalTime;
    this.totalPrice = totalPrice;
    this.location = location;
}

Object.defineProperty(Billing.prototype, "getDateString", {
    get() {
        return DateTimeParser.ToString(this.date);
    }
});


Billing.Type = {
    Invoice : "Invoice"
};

let BillingRecords = (function () {

    function BillingRecords() {
        this.billingRecords = [
            new Billing(789064, "05.05.2020", Billing.Type.Invoice, "566", "32 h 30 min", 63,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "08.05.2020", Billing.Type.Invoice, "1678", "78 h 32 min", 600,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "06.05.2020", Billing.Type.Invoice, "137", "12 h 21 min", 521,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "07.05.2020", Billing.Type.Invoice, "16", "74 h 30 min", 345,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "01.02.2020", Billing.Type.Invoice, "1", "63 h 30 min", 678,
                new Location("Latvia", "Valmiera", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "14.02.2020", Billing.Type.Invoice, "600", "10 h 21 min", 230,
                new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z")),
            new Billing(789064, "01.05.2020", Billing.Type.Invoice, "14", "70 h 32 min", 121,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "02.05.2019", Billing.Type.Invoice, "13", "81 h 37 min", 320,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "04.01.2017", Billing.Type.Invoice, "20", "82 h 40 min", 163,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        ];
    }

    BillingRecords.prototype.GetObjects = function () {
        return this.billingRecords;
    }

    BillingRecords.prototype.GetObjectsByCountryCityTime = function(country, city, month, year) {

        let billings = this.GetObjects();

        if(country != "All") {
            billings = billings.filter(x => x.location.country == country);
        }

        if(city != "All") {
            billings = billings.filter(x => x.location.city == city);
        }

        if(month != "All") {
            let monthIndex = DateTimeParser.GetMonthIndex(month);
            if(monthIndex != 0) {
                billings = billings.filter(x =>x.date.month == monthIndex);
            }
        }

        if(year != "All") {
            year = parseInt(year);
            billings = billings.filter(x =>x.date.year == year);
        }

        return billings;
    }

    return BillingRecords;
})();