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

  let mvLoading = new LoadingComponent(vueModel);

  if(document.getElementById('stations-page')!=null) {
    let mvStations = new StationsComponent(vueModel);
  }

  if(document.getElementById('users-page')!=null) {
    let mvUsers = new UsersComponent(vueModel);
  }

  app = new Vue(vueModel);

};
