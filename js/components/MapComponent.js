let MapComponent = function () {
  let citiesComponent = CitiesComponent(new CitiesModel(), "mapCities", "mapCitySelector");
  let locations = citiesComponent.GetLocations();

  function InitMap() {

    let all = locations['All'];

    let mapSelector = 'map-container';

    let mymap = {
      setView(x, y) {
      }
    };

    if (jQuery('#' + mapSelector).length > 0) {

      mymap = L.map(mapSelector).setView(all, all[2]);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
      }).addTo(mymap);

      for (let l in locations) {
        if (l != 'All')
          L.marker(locations[l]).addTo(mymap);
      }

      let popup = L.popup();
      mymap.on('click', function (e) {
        //console.log(e);
        popup
            .setLatLng(e.latlng)
            .setContent("Position " + e.latlng.toString())
            .openOn(mymap);
      });
    }

    return mymap;
  }
  // map

  //Log.trace(cityArr);

  function MapComponent(vueModel) {

    let _this = this;

    VueModelInitial(vueModel);

    let citiesComponentObj = new citiesComponent(vueModel);

    let mymap = null;

    CopyObjects(vueModel.watch, {
      mapCitySelector: function (val, oldVal) {
        _this.setView(citiesComponentObj.GetCityByName(val));
      }
    });

    vueModel.userInitsCallbacks.push(()=> {
      mymap = InitMap();
    });

    this.model = vueModel;

    this.setView = function(selObjs) {

      if(selObjs.length == 0)
        return;

      let obj = selObjs[0];

      //Log.trace(obj);

      if(mymap != null)
        mymap.setView(obj.location, obj.zoom);

    }
  }

  return MapComponent;
}
