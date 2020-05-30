
let BillingComponent = (function () {

    let monthComponent = MonthComponent();
    let countriesComponent = CountriesComponent();


    let StateType = Aggregator.StateType;

    function BillingComponent(vueModel) {
        let _this = this;

        VueModelInitial(vueModel);

        let countriesComponentObj = new countriesComponent(vueModel);
        let monthComponentObj = new monthComponent(vueModel);

        countriesComponentObj.Callback = function (country, city) {
            _this.Filter();
        }

        this.model = vueModel;
    }

    BillingComponent.prototype.Filter = function()
    {

    }

    return BillingComponent;
})();
