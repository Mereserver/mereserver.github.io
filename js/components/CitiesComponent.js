let CitiesComponent = function (citiesModel) {
    function CitiesComponent(vueModel) {

        let cityArr = [];

        if (typeof vueModel.data == "undefined")
            vueModel.data = {};

        let locations = citiesModel.GetLocations();

        for (let key in locations) {
            cityArr.push(new City(key, locations[key]))
        }

        CopyObjects(vueModel.data, {
            cities: cityArr,
            citiesSelector: "All"
        });

        this.model = vueModel;
        this.cityArr = cityArr;
    }

    CitiesComponent.GetLocations = () => citiesModel.GetLocations();

    CitiesComponent.prototype.GetCityByName = function(val) {
        return this.cityArr.filter(x => x.name == val);
    };

    return CitiesComponent;
};