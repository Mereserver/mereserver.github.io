
let UsersComponent = (function () {

  const paginatorMaxObjects = 8;

  let StateType = Aggregator.StateType;

  function UsersComponent(vueModel) {
    let _this = this;

    this.model = vueModel;

    let sAgg = this.usersAggregator = new Aggregator(new UsersAggregator());

    VueModelInitial(vueModel);

    let objs = sAgg.GetObjects();

    CopyObjects(vueModel.data, {
      usersAggregator: sAgg,
      users: objs,
      usersTotal: objs.length
    });

    CopyObjects(vueModel.methods, {
      OnAddUser: function () {
        ModalWindows.ShowUserModal();
        sAgg.AddModelEvent();
      },
      OnEditUser: function () {
        try {
          sAgg.EditModelEvent();
          ModalWindows.ShowUserModal();
        } catch (e) {
          ModalWindows.ShowError(e);
        }
      },
      OnUsersAggregatorSubmit() {
        try {
          let mode = sAgg.Mode;
          if (!sAgg.Submit())
            ModalWindows.HideUserModal();

          if (mode == StateType.Add) {
            ModalWindows.ShowSuccess("Station added");
          } else if (mode == StateType.Edit) {
            ModalWindows.ShowSuccess("Station updated");
          }
        } catch (e) {
          ModalWindows.ShowError("OnusersAggregatorSubmit: " + e);
        }
      },
      OnDeleteUser() {
        sAgg.DeleteModel();
      },
      OnUsersAggregatorCheckClick(e) {
        sAgg.OnCheckClick(e);
      }
    });

    let paginatorObj = new PaginatorComponent(vueModel, paginatorMaxObjects);
    this.paginatorObj = paginatorObj;

    paginatorObj.Callback = (objs) => {
      this.SetRecords(objs);
    }

    vueModel.userInitsCallbacks.push(()=> {
      _this.Filter();
    });

  }

  UsersComponent.prototype.Filter = function()
  {
    let objs = this.usersAggregator.GetObjects();

    objs = this.paginatorObj.Filter(objs);

    this.SetRecords(objs);
  }

  UsersComponent.prototype.SetRecords = function(objs) {
    this.model.data.users = objs;
  }

  return UsersComponent;
})();
