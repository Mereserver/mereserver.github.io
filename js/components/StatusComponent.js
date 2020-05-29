let StatusComponent = function (status) {

    function StatusComponent(vueModel) {
        if(typeof vueModel == "undefined")
            return;

        if(typeof status == "undefined")
            return;

        let $this = this;

        let statuses = status.GetStatuses();

        this.Callback = function(status){};

        let countriesNames = [];

        if (typeof vueModel.data == "undefined")
            vueModel.data = {};

        if (typeof vueModel.watch == "undefined")
            vueModel.watch = {};

        let defaultStatus = statuses.length == 0 ? "-" : statuses[0];

        CopyObjects(vueModel.data, {
            statuses: statuses,
            statusSelector: defaultStatus
        });

        let currentStatus = defaultStatus;

        CopyObjects(vueModel.watch, {
            statusSelector: function (status, oldVal) {
                currentStatus = status;
                $this.Callback(status);
            }
        });

        this.model = vueModel;

        this.GetStatus = function () {
            return currentStatus;
        }
    }

    return StatusComponent;
};