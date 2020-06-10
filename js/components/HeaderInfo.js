function Manager(name, email) {

    if (typeof name == "string" && typeof email == "string") {
        this.name = name;
        this.email = email;
    } else if (typeof name == "object") {
        this.name = name.name || "Name";
        this.email = name.email || "email";
    }
}

let HeaderInfo = (function () {
    function HeaderInfo(vueModel) {
        VueModelInitial(vueModel);

        let model = this.LoadModel();

        CopyObjects(vueModel.data, {
            companyName: "MEREDOT",
            userName: model.userName,
            relationshipManager: model.relationshipManager,
            manager: model.manager,
        });
    }

    HeaderInfo.prototype.LoadModel = function () {
        return {
            relationshipManager: new Manager({
                name: "Roman Bysko", email: "rb@meredot.com"
            }),
            manager: new Manager({
                name: "Helen Lykova", email: "hl@meredot.com"
            }),
            userName : "roman_bysko"
        }
    }

    return HeaderInfo;
})();