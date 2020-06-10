
let StationRatingComponent = (function () {

    let countriesComponent = CountriesComponent();
    let dateRangePresetsComponent = StatusComponent(new DateRangePresetsModel());
    let dateRangeComponent = DateRangeComponent();

    let RangeStates = DateRangePresetsModel.States;

    const rangeNameDefault = RangeStates.ThisMonth;

    function StationRatingComponent(vueModel) {
        let _this = this;

        this.model = vueModel;

        VueModelInitial(vueModel);

        let compObjFactory = MapComponent();
        let mapObj = new compObjFactory(vueModel);

        let countriesComponentObj = new countriesComponent(vueModel);
        this.countriesComponentObj = countriesComponentObj;

        let dateRangeComponentObj = new dateRangeComponent(vueModel, rangeNameDefault);
        this.dateRangeComponentObj = dateRangeComponentObj;

        countriesComponentObj.Callback = function (country, city) {
            _this.Filter();
        }

        let stationsRatingObj = new StationsRating();

        this.GetRecords = function () {
            return stationsRatingObj.GetObjects();
        }

        this.GetObj = function () {
            return stationsRatingObj;
        }

        CopyObjects(vueModel.data, {
            stationsRatings: _this.GetRecords()
        });

        let dateRangePresetsComponentObj = new dateRangePresetsComponent(vueModel, rangeNameDefault);

        dateRangePresetsComponentObj.Callback = (rangeName) => {
            dateRangeComponentObj.SetRangeState(rangeName);
            _this.Filter();
        }

        vueModel.userInitsCallbacks.push(()=> {
            _this.Filter();
        });
    }

    StationRatingComponent.prototype.Filter = function()
    {
        let countriesComponentObj = this.countriesComponentObj;
        let dateRangeComponentObj = this.dateRangeComponentObj;

        let stationsRating = this.GetObj();

        let country = countriesComponentObj.GetCountry();
        let city = countriesComponentObj.GetCity();

        let start = dateRangeComponentObj.GetDateStart();
        let end = dateRangeComponentObj.GetDateEnd();

        this.SetRecords(stationsRating.GetObjectsByCountryCityAndDate(country, city, start, end));
    }

    StationRatingComponent.prototype.SetRecords = function(ratings) {
        this.model.data.stationsRatings = ratings;
    }

    StationRatingComponent.prototype.InitMap = function() {

    }

    return StationRatingComponent;
})();
