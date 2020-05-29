
let StationsComponent = (function () {

  let countriesComponent = CountriesComponent();

  let StateType = Aggregator.StateType;

  function StationsComponent(vueModel) {
    let sAgg = this.stationsAggregator = new Aggregator(new StationsAggregator());

    if (typeof vueModel.data == "undefined")
      vueModel.data = {};

    if (typeof vueModel.methods == "undefined")
      vueModel.methods = {};

    let countriesComponentObj = new countriesComponent(vueModel);

    if (typeof vueModel.watch == "undefined")
      vueModel.watch = {};

    CopyObjects(vueModel.data, {
      stationsAggregator: sAgg,
      stations: sAgg.GetObjects()
    });

    CopyObjects(vueModel.methods, {
      OnAddStation: function () {
        sAgg.AddModelEvent();
      },
      OnEditStation: function () {
        try {
          sAgg.EditModelEvent();
          ModalWindows.ShowStationModal();
        } catch (e) {
          ModalWindows.ShowError(e);
        }
      },
      OnStationsAggregatorSubmit() {
        try {
          let mode = sAgg.Mode;
          if (!sAgg.Submit())
            ModalWindows.HideStationModal();

          if (mode == StateType.Add) {
            ModalWindows.ShowSuccess("Station added");
          } else if (mode == StateType.Edit) {
            ModalWindows.ShowSuccess("Station updated");
          }
        } catch (e) {
          ModalWindows.ShowError("OnStationsAggregatorSubmit: " + e);
        }
      },
      OnDeleteStation() {
        sAgg.DeleteModel();
      },
      OnStationsAggregatorOnCheckClick(e) {
        sAgg.OnCheckClick(e);
      }
    });

    countriesComponentObj.Callback = function (country, city) {

      let stations = sAgg.GetObjects();

      if(country != "All") {
        stations = stations.filter(x => x.location.country == country);
      }

      if(city != "All") {
        stations = stations.filter(x => x.location.city == city);
      }

      vueModel.data.stations = stations;
      // for(let s in stations) {
      //
      //   s.location.country == country
      // }
    }

    this.model = vueModel;
  }

  return StationsComponent;
})();
