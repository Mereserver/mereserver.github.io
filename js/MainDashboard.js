let app;

window.onload = function() {

  let vueModel = {
    el: "#app",
    computed: {},
    data: {},
    methods: {},
    userInitsCallbacks: []
  };

  let dashboardObj = new DashboardComponent(vueModel);


  app = new Vue(vueModel);

};
