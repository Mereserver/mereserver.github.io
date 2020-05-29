
let StationsComponent = (function () {

  let statusComponent = StatusComponent(new StationStatusModel());
  let countriesComponent = CountriesComponent();

  let StateType = Aggregator.StateType;

  function StationsComponent(vueModel) {
    let _this = this;
    let sAgg = this.stationsAggregator = new Aggregator(new StationsAggregator());

    this.GetStations = function () {
      return sAgg.GetObjects();
    }

    if (typeof vueModel.data == "undefined")
      vueModel.data = {};

    if (typeof vueModel.methods == "undefined")
      vueModel.methods = {};

    let countriesComponentObj = new countriesComponent(vueModel);
    let statusComponentObj = new statusComponent(vueModel);

    this.countriesComponentObj = countriesComponentObj;
    this.statusComponentObj = statusComponentObj;

    if (typeof vueModel.watch == "undefined")
      vueModel.watch = {};

    CopyObjects(vueModel.data, {
      stationsAggregator: sAgg,
      stations: _this.GetStations()
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
      _this.Filter();
    }

    statusComponentObj.Callback = function (inStatus) {
      _this.Filter();
    }

    this.model = vueModel;
  }

  StationsComponent.prototype.Filter = function()
  {
    let statusComponentObj = this.statusComponentObj;

    let inStatus = statusComponentObj.GetStatus();

    if(typeof inStatus == "undefined")
      return;

    let countriesComponentObj = this.countriesComponentObj;

    let stations = this.GetStations();

    let country = countriesComponentObj.GetCountry();
    let city = countriesComponentObj.GetCity();

    if(country != "All") {
      stations = stations.filter(x => x.location.country == country);
    }

    if(city != "All") {
      stations = stations.filter(x => x.location.city == city);
    }

    if(inStatus != "All") {

      let newStations = [];

      for (let s in stations) {
        if (typeof stations[s].slots != "undefined") {

          let newSlots = stations[s].slots.filter(s => s.status == inStatus);

          if (newSlots.length > 0) {

            let newStation = stations[s].Clone();

            newStation.slots = newSlots;

            newStations.push(newStation);
          }

          //Log.trace(stations[s]);
        }
      }

      this.model.data.stations = newStations;

      return;
    }

    this.model.data.stations = stations;
  }

  return StationsComponent;
})();
