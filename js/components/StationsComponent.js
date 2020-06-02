
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

    VueModelInitial(vueModel);

    let countriesComponentObj = new countriesComponent(vueModel);
    let statusComponentObj = new statusComponent(vueModel);

    this.countriesComponentObj = countriesComponentObj;
    this.statusComponentObj = statusComponentObj;

    this.CalcStationsBrief(_this.GetStations(), vueModel.data);

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
      Log.trace(inStatus);
      _this.Filter();
    }

    this.model = vueModel;
  }

  StationsComponent.prototype.Filter = function()
  {
    let statusComponentObj = this.statusComponentObj;

    let inFilter = statusComponentObj.GetStatus();

    if(typeof inFilter == "undefined")
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

    if(inFilter != "All") {

      let newStations = [];

      for (let s in stations) {
        if (typeof stations[s].slots != "undefined") {

          let newSlots = stations[s].slots.filter(s => s.status == inFilter || s.info == inFilter);

          if (newSlots.length > 0) {

            let newStation = stations[s].Clone();

            newStation.slots = newSlots;

            newStations.push(newStation);
          }

          //Log.trace(stations[s]);
        }
      }

      this.SetStations(newStations);

      return;
    }

    this.SetStations(stations);
  }

  StationsComponent.prototype.SetStations = function(stations) {
    this.model.data.stations = stations;

    this.CalcStationsBrief(stations, this.model.data)
  }

  StationsComponent.prototype.CalcStationsBrief = function(stations, data) {
    if(typeof stations == "undefined" || typeof data == "undefined")
      return;

    let s = stations; //this.GetStations();

    data.stationsNumber = s.length;
    data.slotsNumber = stations.map(x => x.slots.length).reduce((a, b) => a + b, 0);
    data.slotsAvailableNumber = stations.map(x => x.slots.filter(y => y.status == Slot.Satatus.Available).length).reduce((a, b) => a + b, 0);
    data.slotsOccupiedNumber = stations.map(x => x.slots.filter(y => y.status == Slot.Satatus.Occupied).length).reduce((a, b) => a + b, 0);
    data.slotsOfflineNumber = stations.map(x => x.slots.filter(y => y.info == Slot.Info.Offline).length).reduce((a, b) => a + b, 0);
  }

  return StationsComponent;
})();
