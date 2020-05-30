let ResponsiveTable = (function () {
    let $ = jQuery;

    function CalcStage1(element) {
        if(element.length == 0)
            return 0;
        return  parseInt(element.css('margin-top')) + parseInt(element.css('margin-bottom') ) +
            parseInt(element.css('border-top-width') ) + parseInt(element.css('border-bottom-width') );
    }

    function CalcPaddingTopBottom(element) {
        if(element.length == 0)
            return 0;
        return  parseInt(element.css('padding-top')) + parseInt(element.css('padding-bottom') );
    }

    function CalcHeightOfElement(element)
    {
        if(element.length == 0)
            return 0;

        return CalcStage1(element) + parseInt(element.css('height'));
    }

    function Update() {

        let hSize = CalcHeightOfElement($('.top-container'));
        hSize += CalcHeightOfElement($('.spacer'));
        hSize += CalcHeightOfElement($('.card-header'));
        hSize += CalcPaddingTopBottom($('.card-body'));

        let sz = window.innerHeight - hSize;

        $('.table-responsive').height(sz);

        return sz;
    }

    function ResponsiveTable() {
        let objThis = this;

        this.CallBack = function(){};

        function LocalUpdate()
        {
            objThis.CallBack(Update());
        }

        $(window).on('resize', ()=> {
            LocalUpdate();
        });
        LocalUpdate();

        let sz = 0;

        this.timer = setInterval(()=> {
            let newSz = LocalUpdate();
            if(newSz != 0 && newSz == sz)
            {
                clearInterval(this.timer);
            }
            sz = newSz;
        }, 100);

        this.Update = Update;
    }

    return ResponsiveTable;
})();
