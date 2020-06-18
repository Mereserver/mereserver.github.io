let app;

window.onload = function() {

  let RangeStates = DateRangePresetsModel.States;

  let vueModel = {
    el: "#app",
    computed: {},
    data: {},
    methods: {},
    userInitsCallbacks: []
  };

  let dashboardObj = new DashboardComponent(vueModel);

  let stationRatingComponent = new StationRatingComponent(vueModel, RangeStates.All, new StationsRating2(),
      [32.068683,34.767,14], {
        country : "Israel",
        city: "Tel Aviv-Yafo"
      }, new CountriesModel2());


  app = new Vue(vueModel);

};
