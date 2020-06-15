let CountriesComponent = function () {
    let countries = new CountriesModel();

    let defaultCountry = "Latvia";
    let defaultCity = "Riga";

    function CountriesComponent(vueModel) {
        let $this = this;

        this.Callback = function(country, city){};

        VueModelInitial(vueModel);

        let countriesNames = countries.GetCountries();
        let cities = countries.GetAllCities();

        CopyObjects(vueModel.data, {
            countries: countriesNames,
            countriesSelector: defaultCountry,
            cities: cities,
            citiesSelector: defaultCity
        });

        let selectedCountry = defaultCountry;
        let selectedCity = defaultCity;

        CopyObjects(vueModel.watch, {
            countriesSelector: function (country, oldVal) {

                selectedCountry = country;

                let filteredCities = countries.GetCitiesByCountry(country);

                if(filteredCities.length == 0)
                  return;

                vueModel.data.cities = filteredCities;
                vueModel.data.citiesSelector = selectedCity = "All";

                $this.Callback(country, "All");
            },
            citiesSelector: function (city, oldVal) {

                selectedCity = city;

                $this.Callback(selectedCountry, city);
            }
        });

        this.model = vueModel;
        this.cityArr = countries;
        this.cities = cities;
        this.GetCountry = function () {
            return selectedCountry;
        }
        this.GetCity = function () {
            return selectedCity;
        }
    }

    CountriesComponent.GetLocations = () => citiesModel.GetLocations();

    CountriesComponent.prototype.GetCityByName = function(val) {
        return this.cityArr.filter(x => x.name == val);
    };

    return CountriesComponent;
};