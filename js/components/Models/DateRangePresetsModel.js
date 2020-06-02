let DateRangePresetsModel = (function(){
    const states = {
        LastMonth: "Last month", ThisMonth : "This month", LastWeek: "Last week", ThisWeek: "This week"
    }

    function DateRangePresetsModel() {
    };

    DateRangePresetsModel.prototype.GetStatuses = function () {
        let result = [];
        for(let i in states)
        {
            result.push(states[i]);
        }
        return result;
    }

    DateRangePresetsModel.States = states;

    return DateRangePresetsModel;
})();