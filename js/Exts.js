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
