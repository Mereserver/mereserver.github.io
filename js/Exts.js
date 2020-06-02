let developMode = true;

/* Exts functions */
//let ArrayExt =
// (function(){
//
// })();

// logger //
let Log = {
  trace(msg) {
    if (developMode)
      console.log(msg);
  },
  error(msg) {
    if (developMode)
      console.error(msg);
  }
};

Array.prototype.removeItem = function (i) {
  if (i != -1) {
    this.splice(i, 1);
  }
}

Array.prototype.removeObj = function (obj) {
  var i = this.indexOf(obj);
  if (i != -1) {
    this.splice(i, 1);
  }
}

function CopyObjects(obj1, obj2) {
  for (let attrname in obj2) {
    obj1[attrname] = obj2[attrname];
  }
}

function VueModelInitial(vueModel) {
  if (typeof vueModel == "undefined")
      return;

  if (typeof vueModel.data == "undefined")
    vueModel.data = {};

  if (typeof vueModel.methods == "undefined")
    vueModel.methods = {};

  if (typeof vueModel.watch == "undefined")
    vueModel.watch = {};

  if (typeof vueModel.userInitsCallbacks == "undefined")
    vueModel.userInitsCallbacks = {};
}

let CalcElements = {
  CalcStage1(element) {
  if(element.length == 0)
      return 0;
    return  parseInt(element.css('margin-top')) + parseInt(element.css('margin-bottom') ) +
        parseInt(element.css('border-top-width') ) + parseInt(element.css('border-bottom-width') );
  },
  CalcPaddingTopBottom(element) {
    if(element.length == 0)
      return 0;
    return  parseInt(element.css('padding-top')) + parseInt(element.css('padding-bottom') );
  },
  CalcHeightOfElement(element)
  {
    if(element.length == 0)
      return 0;

    return CalcElements.CalcStage1(element) + parseInt(element.css('height'));
  }
}

let DateTimeParser = (function() {
  const months = ["All", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return {
    FromString(dateTimeString) {
      if (typeof dateTimeString == 'undefined')
        return null;

      let arr = dateTimeString.split('.');

      if (arr.length < 3) {
        arr = dateTimeString.split('/');
        if (arr.length < 3) {
          return null;
        }
      }

      return {
        day: arr[0].trim(),
        month: arr[1].trim(),
        year: arr[2].trim()
      }
    },
    ToString(dateTimeObj, delim) {
      delim = delim || '.';

      if (typeof dateTimeObj == 'undefined' || dateTimeObj == null)
        return "";

      return ('0' + dateTimeObj.day).slice(-2) + delim
      + ('0' + (dateTimeObj.month)).slice(-2) + delim
      + dateTimeObj.year;

      //return dateTimeObj.day.toString() + delim + dateTimeObj.month.toString() + delim + dateTimeObj.year.toString();
    },
    GetMonths() {
      return months;
    },
    GetMonthIndex(monthName) {
      return months.indexOf(monthName);
    },
    GetCurrentDateByString(delim){
      delim = delim || '.';
      let dt = new Date();

      return ('0' + dt.getDate()).slice(-2) + delim
          + ('0' + (dt.getMonth()+1)).slice(-2) + delim
          + dt.getFullYear();
    },
    Equal(date1, date2) {
      return date1.year == date2.year &&
          date1.month == date2.month &&
          date1.day == date2.day
    },
    InRangeDate(dateFrom, dateTo, current) {

      if (typeof dateFrom == 'undefined')
        return false;

      if (typeof dateTo == 'undefined')
        return false;

      if (typeof current == 'undefined')
        return false;

      let from = new Date(dateFrom.year, parseInt(dateFrom.month)-1, dateFrom.day);
      let to   = new Date(dateTo.year, parseInt(dateTo.month)-1, dateTo.day);
      let check = new Date(current.year, parseInt(current.month)-1, current.day);

      return check >= from && check <= to;
    },
    daysInMonth (month, year) {
      return new Date(year, month, 0).getDate();
    }
  };
})();
