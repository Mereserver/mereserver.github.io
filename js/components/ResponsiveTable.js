let ResponsiveTable = (function () {
    function CalcHeightOfElement(element)
    {
        if(element.length == 0)
            return 0;
        return parseInt(element.css('margin-top')) + parseInt(element.css('margin-bottom') ) +
            parseInt(element.css('border-top-width') ) + parseInt(element.css('border-bottom-width') ) +
        + parseInt(element.css('height'))
    }

    function Update() {

        let hSize = CalcHeightOfElement($('.top-container'));
        hSize += CalcHeightOfElement($('.spacer'));
        hSize += CalcHeightOfElement($('.card-header'));

        let sz = window.innerHeight - hSize;

        $('.table-responsive').height(sz);

        Log.trace("update");

        return sz;
    }

    function ResponsiveTable() {
        let $ = jQuery;
        $(window).on('resize', Update);
        Update();

        let sz = 0;

        this.timer = setInterval(()=> {
            let newSz = Update();
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
