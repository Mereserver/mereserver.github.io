// User //
function User(name, logo, login, password, totalScooters, role) {
  this.selected = false;

  this.name = name;
  this.logo = logo;
  this.login = login;
  this.password = password;
  this.totalScooters = totalScooters;

  if(typeof role == "undefined")
    role = ["user"];

  if(typeof role == "string")
    role = [role];

  this.role = role;
}

Object.defineProperty(User.prototype, "GetRoleAsString", {
  get: function () {
   if(typeof this.role == "object")
   {
     return this.role.join('/');
   }

    return "Undefined";
  }
});

User.Roles = Object.freeze({
  Admin: "Admin",
  User: "User",
  Customer: "Customer"
});

// Object.defineProperty(User.prototype, "GetStatusClass", {
//   get: function () {
//     if (this.status == 0) return "text-secondary";
//     else if (this.status == 1) return "text-success";
//     else if (this.status == -1) return "text-danger";
//     else return "text-secondary";
//   }
// });

// Implement interface function //
User.prototype.Clone = function() {
  let s = this;
  return new User(s.name, s.logo, s.login, s.password, this.totalScooters, this.role);
}

// end User //

// UsersAggregator //
let UsersAggregator = (function () {

  const Roles = User.Roles;

  const StatusType = Object.freeze({"Error": -1, "Disabled": 0, "Enabled": 1});
  const titles = ["default", "Add User", "Update User"];

  const StateType = Aggregator.StateType;

  function UsersAggregator() {

    this.Users = [
      new User("Uber", "Logo 1", "Test user1", "xxxxx", 11, [Roles.Admin]),
      new User("Lime", "Logo 2", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Google", "Logo 3", "Test user3", "xxxxx", 13),
      new User("User 4", "Logo 4", "Test user4", "xxxxx", 14),
      new User("User 5", "Logo 5", "Test user5", "xxxxx", 15),
      new User("Lime 1", "Logo 1", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 2", "Logo 2", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 3", "Logo 3", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 4", "Logo 4", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 5", "Logo 5", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 6", "Logo 6", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 7", "Logo 7", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 8", "Logo 8", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 9", "Logo 9", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 10", "Logo 10", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 11", "Logo 11", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 12", "Logo 12", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 13", "Logo 13", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 14", "Logo 14", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer])
    ];
  }

  // Implement interface functions //
  UsersAggregator.prototype.GetTitles = function () {
    return titles;
  }

  UsersAggregator.prototype.GetObjects = function () {
    return this.Users;
  }

  UsersAggregator.prototype.CreateDefaultModel = function () {
    return new User("", "", "", "", 0, "user");
  }
  return UsersAggregator;

})();
// end UsersAggregator //

