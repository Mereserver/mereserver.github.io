

let CountriesModel = (function(){
    let countries = {
        "All": ["All"],
        "Ukraine" : ["Kiev"],
        "Latvia": ["Riga"],
        "Estonia": ["Tallin"],
        "Finland": ["Helsinki"],
        "Netherlands" : ["Amsterdam"],
        "France" : ["Paris"],
        "Poland" : ["Warsaw"],
        "Germany" : ["Berlin", "Frankfurt"]
    };

    function CountriesModel() {
    };

    CountriesModel.prototype.GetCitiesByCountry = function (county) {
        let cities = countries[county];
        if(typeof cities == "undefined")
            return ["-"];

        if(cities.length == 0 || county == "All") {
            return this.GetAllCities();
        }

        return cities;
    }

    CountriesModel.prototype.GetAllCities = function() {
        let rez = [];
        for (let c in countries)
            rez = rez.concat(countries[c]);

        return rez;
    }

    CountriesModel.prototype.GetCountries = function() {
        let rez = [];
        for (let c in countries)
            rez.push(c);
        return rez;
    }

    return CountriesModel;
})();