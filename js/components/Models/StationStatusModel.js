let StationStatusModel = (function(){
    function StatusModel() {
    };

    StatusModel.prototype.GetStatuses = function () {
        return ["All", "Online", "Offline"];
    }

    return StatusModel;
})();