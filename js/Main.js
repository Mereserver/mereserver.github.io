let app;

// Core //
window.onload = function () {

  let vueModel = {
    el: "#app",
    computed: {},
    data: {},
    methods: {},
    created() {
      mvLoading.Hide();
    }
  };

  let responsiveTable = new ResponsiveTable();

  let mvLoading = new LoadingComponent(vueModel);

  mvLoading.CallBack = () => {
    responsiveTable.Update();
  }

  if(document.getElementById('stations-page')!=null) {
    let mvStations = new StationsComponent(vueModel);
  }

  if(document.getElementById('scooters-page')!=null) {
    let mvStations = new ScootersComponent(vueModel);
  }

  if(document.getElementById('billing-page')!=null) {
    let mvStations = new BillingComponent(vueModel);
  }

  if(document.getElementById('users-page')!=null) {
    let mvUsers = new UsersComponent(vueModel);
  }

  if(document.getElementById('power-cost-page')!=null) {
    let mvUsers = new PowerCostComponent(vueModel);
  }

  app = new Vue(vueModel);


};
