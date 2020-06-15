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

  let stationRatingComponent = new StationRatingComponent(vueModel, RangeStates.All);


  app = new Vue(vueModel);

};
