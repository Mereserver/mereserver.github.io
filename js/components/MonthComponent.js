let MonthComponent = function () {

    let months = [ "All", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    let years = [
        "All"
    ];

    for (let i = 2000; i < 2038; i++) {
        years.push(i.toString());
    }

    function MonthComponent(vueModel) {
        let $this = this;

        this.Callback = function(month, city){};

        VueModelInitial(vueModel);

        CopyObjects(vueModel.data, {
            months: months,
            monthSelector: "All",
            years: years,
            yearSelector: "All"
        });


    }

    return MonthComponent;
};