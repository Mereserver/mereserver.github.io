
let PowerCostComponent = (function () {

    let countriesComponent = CountriesComponent();

    let StateType = Aggregator.StateType;

    function PowerCostComponent(vueModel) {
        let _this = this;

        VueModelInitial(vueModel);

        let countriesComponentObj = new countriesComponent(vueModel);

        countriesComponentObj.Callback = function (country, city) {
            _this.Filter();
        }

        this.model = vueModel;
    }

    PowerCostComponent.prototype.Filter = function()
    {

    }

    return PowerCostComponent;
})();
