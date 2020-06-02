let MonthComponent = function () {

    const defaultValue = 'All';

    const months = DateTimeParser.GetMonths();

    let years = [
        "All"
    ];

    for (let i = new Date().getFullYear(); i >= 2000; --i) {
        years.push(i.toString());
    }

    function MonthComponent(vueModel) {
        let $this = this;

        this.Callback = function(month, year){};

        VueModelInitial(vueModel);

        CopyObjects(vueModel.data, {
            months: months,
            monthSelector: defaultValue,
            years: years,
            yearSelector: defaultValue
        });

        let currentMonth = defaultValue;
        let currentYear = defaultValue;

        CopyObjects(vueModel.watch, {
            monthSelector: function (month, oldVal) {
                currentMonth = month.trim();
                $this.Callback(month, currentYear);
            },
            yearSelector : function (year, oldVal) {
                currentYear = year.trim();
                $this.Callback(currentMonth, year);
            }
        });

        this.GetMonth = function () {
            return currentMonth;
        }

        this.GetYear = function () {
            return currentYear;
        }
    }

    return MonthComponent;
};