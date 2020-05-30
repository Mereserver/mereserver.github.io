let ScooterStatusModel = (function(){
    function ScooterStatusModel() {
    };

    ScooterStatusModel.prototype.GetStatuses = function () {
        return ["All", "Charging", "Offline", "Charged"];
    }

    return ScooterStatusModel;
})();