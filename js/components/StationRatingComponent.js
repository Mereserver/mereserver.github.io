
let StationRatingComponent = (function () {

    let countriesComponent = CountriesComponent();

    let StateType = Aggregator.StateType;

    function StationRatingComponent(vueModel) {
        let _this = this;

        VueModelInitial(vueModel);

        let compObjFactory = MapComponent();
        let mapObj = new compObjFactory(vueModel);

        let countriesComponentObj = new countriesComponent(vueModel);

        countriesComponentObj.Callback = function (country, city) {
            _this.Filter();
        }
        this.model = vueModel;


    }

    StationRatingComponent.prototype.Filter = function()
    {
    }

    StationRatingComponent.prototype.InitMap = ()=> {

    }

    return StationRatingComponent;
})();
