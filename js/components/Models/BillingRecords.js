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
            new Billing(789064, "05.05.2020", Billing.Type.Invoice, "5678 kW", 567, 789,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "05.05.2020", Billing.Type.Invoice, "1678 kW", 567, 789,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "05.05.2020", Billing.Type.Invoice, "137 kW", 567, 789,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "05.05.2020", Billing.Type.Invoice, "16 kW", 567, 789,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "01.02.2020", Billing.Type.Invoice, "1 kW", 36, 500,
                new Location("Latvia", "Valmiera", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "14.02.2020", Billing.Type.Invoice, "600 kW", 89, 900,
                new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z")),
            new Billing(789064, "05.05.2020", Billing.Type.Invoice, "16 kW", 567, 789,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "05.05.2019", Billing.Type.Invoice, "16 kW", 567, 789,
                new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
            new Billing(789064, "05.01.2017", Billing.Type.Invoice, "16 kW", 567, 789,
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