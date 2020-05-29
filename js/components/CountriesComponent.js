let CountriesComponent = function () {
    let countries = new CountriesModel();

    function CountriesComponent(vueModel) {
        let $this = this;

        this.Callback = function(country, city){};

        let countriesNames = [];

        if (typeof vueModel.data == "undefined")
            vueModel.data = {};

        if (typeof vueModel.watch == "undefined")
            vueModel.watch = {};

        countriesNames = countries.GetCountries();
        let cities = countries.GetAllCities();

        CopyObjects(vueModel.data, {
            countries: countriesNames,
            countriesSelector: "All",
            cities: cities,
            citiesSelector: "All"
        });

        let selectedCountry = "All";

        CopyObjects(vueModel.watch, {
            countriesSelector: function (country, oldVal) {

                selectedCountry = country;

                let filteredCities = countries.GetCitiesByCountry(country);

                if(filteredCities.length == 0)
                  return;

                vueModel.data.cities = ["All"].concat(filteredCities);
                vueModel.data.citiesSelector = "All";

                $this.Callback(country, "All");
            },
            citiesSelector: function (city, oldVal) {

                $this.Callback(selectedCountry, city);
            }
        });

        this.model = vueModel;
        this.cityArr = countries;
        this.cities = cities;
    }

    CountriesComponent.GetLocations = () => citiesModel.GetLocations();

    CountriesComponent.prototype.GetCityByName = function(val) {
        return this.cityArr.filter(x => x.name == val);
    };

    return CountriesComponent;
};