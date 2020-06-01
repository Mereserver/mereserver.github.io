
let BillingComponent = (function () {

    let monthComponent = MonthComponent();
    let countriesComponent = CountriesComponent();

    let StateType = Aggregator.StateType;

    function BillingComponent(vueModel) {
        let _this = this;

        let billingObj = new BillingRecords();

        this.GetBillingRecords = function () {
            return billingObj.GetObjects();
        }

        this.GetBillingObj = function () {
            return billingObj;
        }

        VueModelInitial(vueModel);

        let countriesComponentObj = new countriesComponent(vueModel);
        let monthComponentObj = new monthComponent(vueModel);

        this.countriesComponentObj = countriesComponentObj;
        this.monthComponentObj = monthComponentObj;

        CopyObjects(vueModel.data, {
            billingRecords: _this.GetBillingRecords()
        });

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
