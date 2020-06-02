let app;

function DefaultInit(vueModel) {
  let mvLoading = new LoadingComponent(vueModel);

  let responsiveTable = new ResponsiveTable();

  mvLoading.CallBack = () => {
    responsiveTable.Update();
    Log.trace("size updated");
  }

  responsiveTable.CallBack = (height) => {
    jQuery('#map-container').height(height);
  };

  return {
    mvLoading : mvLoading,
    UpdateTable(){
      responsiveTable.Update();
    }
  }
}

function DisableAllNotImplemented() {
  jQuery('.btn-group').not('[data-toggle="buttons"]').addClass('disabled').find('button').attr('disabled','disabled');
  jQuery('#messages-page button').addClass('disabled').attr('disabled','disabled');
  jQuery('#system-logs button').addClass('disabled').attr('disabled','disabled');
  jQuery('.filter-tabs a').addClass('disabled').on('click', ()=> { return false; });
}

DisableAllNotImplemented();

if(document.getElementById('station-rating-page')!=null) {

  let vueModel = {
    el: ".vue",
    computed: {},
    data: {},
    methods: {},
    userInitsCallbacks: [],
    created() {
      initObj.mvLoading.Hide();
      initObj.UpdateTable();
    },
    updated() {
      initObj.UpdateTable();
    },
    mounted() {
      setTimeout(()=> {
        let callBacks = vueModel.userInitsCallbacks;

        for (let i in callBacks)
        {
          if(typeof callBacks[i] == "function") {
            callBacks[i](vueModel.data);
          }
        }
      }, 100);
    },
  };

  let initObj = DefaultInit(vueModel);

  window.onload = function () {
    let stationRatingComponent = new StationRatingComponent(vueModel);

    app = new Vue(vueModel);

    vueModel.el = ".vue2";
    let app2 = new Vue(vueModel);
  }
}
else {

  let vueModel = {
    el: "#app",
    computed: {},
    data: {},
    methods: {},
    userInitsCallbacks: [],
    mounted() {
      initObj.mvLoading.Hide();

      initObj.UpdateTable();

      setTimeout(()=> {
        let callBacks = vueModel.userInitsCallbacks;

        for (let i in callBacks)
        {
          if(typeof callBacks[i] == "function") {
            callBacks[i](vueModel.data);
          }
        }
      }, 100);
    },
    updated(){
      initObj.UpdateTable();
    },
    created(){
    }
  };


  let initObj = DefaultInit(vueModel);

// Core //
  window.onload = function () {

    if (document.getElementById('stations-page') != null) {
      let stationsComponent = new StationsComponent(vueModel);
    }

    if (document.getElementById('scooters-page') != null) {
      let scootersComponent = new ScootersComponent(vueModel);
    }

    if (document.getElementById('billing-page') != null) {
      let billingComponent = new BillingComponent(vueModel);
    }

    if (document.getElementById('users-page') != null) {
      let usersComponent = new UsersComponent(vueModel);
    }

    if (document.getElementById('power-cost-page') != null) {
      let powerCostComponent = new PowerCostComponent(vueModel);
    }

    if (document.getElementById('messages-page') != null) {
      let responsiveMessages = new ResponsiveMessages();
    }

    app = new Vue(vueModel);

  };
}








