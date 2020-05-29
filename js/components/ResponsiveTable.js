let ResponsiveTable = (function () {
    function CalcHeightOfElement(element)
    {
        return parseInt(element.css('margin-top')) + parseInt(element.css('margin-bottom') )+ parseInt(element.css('height'))
    }

    function Update() {

        let hSize = CalcHeightOfElement($('.top-container'));
        hSize += CalcHeightOfElement($('.spacer'));
        hSize += CalcHeightOfElement($('.card-header'));

        Log.trace(hSize);

        $('.table-responsive').height(window.innerHeight - hSize - 2);

    }

    function ResponsiveTable() {
        let $ = jQuery;
        $(window).on('resize', Update);
        Update();
    }

    return ResponsiveTable;
})();
