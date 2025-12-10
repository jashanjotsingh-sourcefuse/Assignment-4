var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// New TC39 compatible decorator
// New TC39 compatible decorator for Date fields
function DateFormatter() {
    return function (initialValue, context) {
        // ensure field
        if (context.kind !== "field") {
            throw new Error("@DateFormatter can only be used on class fields");
        }
        // return initializer function (expected shape when useDefineForClassFields = false)
        return function (value) {
            var v = value == null ? initialValue : value;
            var date = v == null ? null : new Date(v);
            if (!date)
                return "";
            return new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }).format(date);
        };
    };
}
var Role;
(function (Role) {
    Role["SuperAdmin"] = "SuperAdmin";
    Role["Admin"] = "Admin";
    Role["Subscriber"] = "Subscriber";
})(Role || (Role = {}));
var User = function () {
    var _a;
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    return _a = /** @class */ (function () {
            function User(firstName, middleName, lastName, email, phoneNumber, role, address, createdAt) {
                if (createdAt === void 0) { createdAt = new Date(); }
                this.createdAt = __runInitializers(this, _createdAt_initializers, void 0);
                __runInitializers(this, _createdAt_extraInitializers);
                this.firstName = firstName;
                this.middleName = middleName;
                this.lastName = lastName;
                this.email = email;
                this.phoneNumber = phoneNumber;
                this.role = role;
                this.address = address;
                this.createdAt = createdAt;
            }
            return User;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createdAt_decorators = [DateFormatter()];
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var initialUsersJson = [
    {
        firstName: "John",
        middleName: "A.",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
        role: Role.SuperAdmin,
        address: "123 Main St",
        createdAt: "2025-01-20T15:00:00"
    },
    {
        firstName: "Jane",
        middleName: "",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phoneNumber: "9876543210",
        role: Role.Admin,
        address: "456 Market Ave",
        createdAt: "2025-01-15T09:30:00"
    },
    {
        firstName: "Alex",
        middleName: "K.",
        lastName: "Johnson",
        email: "alex.johnson@example.com",
        phoneNumber: "5551112222",
        role: Role.Subscriber,
        address: "789 Park Blvd",
        createdAt: "2025-01-10T13:20:00"
    }
];
//generic class implementation
var GenericService = /** @class */ (function () {
    function GenericService(initialItems) {
        this.items = [];
        this.originalItems = [];
        this.originalItems = __spreadArray([], initialItems, true);
        this.reset();
    }
    GenericService.prototype.getAll = function () {
        return __spreadArray([], this.items, true);
    };
    GenericService.prototype.reset = function () {
        this.items = __spreadArray([], this.originalItems, true);
    };
    GenericService.prototype.add = function (item) {
        this.items.push(item);
    };
    GenericService.prototype.update = function (index, item) {
        if (index >= 0 && index < this.items.length) {
            this.items[index] = item;
        }
    };
    GenericService.prototype.delete = function (index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    };
    return GenericService;
}());
// class UserService implements IUserService {
//   private users: User[] = [];
//   private originalUsers: User[] = [];
//   constructor() {
//     this.originalUsers = initialUsersJson.map(u => {
//       return new User(
//         u.firstName,
//         u.middleName || null,
//         u.lastName,
//         u.email,
//         u.phoneNumber,
//         u.role,
//         u.address,
//         u.createdAt
//       );
//     });
//     this.reset();
//   }
//   getAll(): User[] {
//     return [...this.users];
//   }
//   reset(): void {
//     this.users = this.originalUsers.map(u => {
//       return new User(
//         u.firstName,
//         u.middleName,
//         u.lastName,
//         u.email,
//         u.phoneNumber,
//         u.role,
//         u.address,
//         u.createdAt
//       );
//     });
//   }
//   add(user: User): void {
//     this.users.push(user);
//   }
//   update(index: number, user: User): void {
//     if (index >= 0 && index < this.users.length) {
//       this.users[index] = user;
//     }
//   }
//   delete(index: number): void {
//     if (index >= 0 && index < this.users.length) {
//       this.users.splice(index, 1);
//     }
//   }
// }
//const userService = new UserService();
//using generic service
//generic service instance
var userService = new GenericService(initialUsersJson.map(function (u) {
    return new User(u.firstName, u.middleName || null, u.lastName, u.email, u.phoneNumber, u.role, u.address, u.createdAt);
}));
var loadBtn = document.getElementById("loadUsersBtn");
var tableBody = document.getElementById("tableBody");
function renderTable() {
    var users = userService.getAll();
    tableBody.innerHTML = "";
    users.forEach(function (user, index) {
        var row = document.createElement("tr");
        row.innerHTML = "\n      <td>".concat(user.firstName, "</td>\n      <td>").concat(user.middleName || "", "</td>\n      <td>").concat(user.lastName, "</td>\n      <td>").concat(user.email, "</td>\n      <td>").concat(user.phoneNumber, "</td>\n      <td>").concat(user.role, "</td>\n      <td>").concat(user.address, "</td>\n      <td>").concat((user.createdAt), "</td>\n      <td>\n        <div class=\"action-buttons\">\n          <button class=\"edit-btn btn btn-primary fa fa-edit\" data-index=\"").concat(index, "\"></button>\n          <button class=\"delete-btn btn btn-danger fa fa-trash-alt\" data-index=\"").concat(index, "\"></button>\n        </div>\n      </td>\n    ");
        tableBody.appendChild(row);
    });
    attachRowEvents();
}
function attachRowEvents() {
    var editBtns = document.querySelectorAll(".edit-btn");
    var deleteBtns = document.querySelectorAll(".delete-btn");
    editBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var index = Number(btn.getAttribute("data-index"));
            enterEditMode(index);
        });
    });
    deleteBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var index = Number(btn.getAttribute("data-index"));
            userService.delete(index);
            renderTable();
        });
    });
}
function enterEditMode(index) {
    var users = userService.getAll();
    tableBody.innerHTML = "";
    users.forEach(function (user, i) {
        var row = document.createElement("tr");
        if (i === index) {
            row.innerHTML = "\n        <td><input name=\"firstName\" value=\"".concat(user.firstName, "\" /></td>\n        <td><input name=\"middleName\" value=\"").concat(user.middleName || "", "\" /></td>\n        <td><input name=\"lastName\" value=\"").concat(user.lastName, "\" /></td>\n        <td><input name=\"email\" value=\"").concat(user.email, "\" /></td>\n        <td><input name=\"phoneNumber\" value=\"").concat(user.phoneNumber, "\" /></td>\n        <td>\n          <select name=\"role\">\n            ").concat(Object.values(Role)
                .map(function (r) { return "<option value=\"".concat(r, "\" ").concat(r === user.role ? "selected" : "", ">").concat(r, "</option>"); })
                .join(""), "\n          </select>\n        </td>\n        <td><input name=\"address\" value=\"").concat(user.address, "\" /></td>\n        <td>").concat((user.createdAt), "</td>\n        <td>\n          <button class=\"save-btn btn btn-success\" data-index=\"").concat(i, "\">Save</button>\n          <button class=\"cancel-btn btn btn-secondary\" data-index=\"").concat(i, "\">Cancel</button>\n        </td>\n      ");
        }
        else {
            row.innerHTML = "\n        <td>".concat(user.firstName, "</td>\n        <td>").concat(user.middleName || "", "</td>\n        <td>").concat(user.lastName, "</td>\n        <td>").concat(user.email, "</td>\n        <td>").concat(user.phoneNumber, "</td>\n        <td>").concat(user.role, "</td>\n        <td>").concat(user.address, "</td>\n        <td>").concat(user.createdAt, "</td>\n        <td>\n          <button class=\"edit-btn btn btn-primary fa fa-edit\" data-index=\"").concat(i, "\"></button>\n          <button class=\"delete-btn btn btn-danger fa fa-trash-alt\" data-index=\"").concat(i, "\"></button>\n        </td>\n      ");
        }
        tableBody.appendChild(row);
    });
    var saveBtn = document.querySelector(".save-btn");
    var cancelBtn = document.querySelector(".cancel-btn");
    saveBtn === null || saveBtn === void 0 ? void 0 : saveBtn.addEventListener("click", function (event) {
        var button = event.currentTarget;
        var row = button.closest("tr");
        if (index < 0 || index >= users.length)
            return;
        var originalUser = users[index];
        var inputs = row.querySelectorAll("input[name]");
        var select = row.querySelector("select[name='role']");
        var updatedData = {};
        inputs.forEach(function (input) {
            updatedData[input.name] = input.value || null;
        });
        updatedData.role = select.value;
        var updatedUser = new User(updatedData.firstName, updatedData.middleName, updatedData.lastName, updatedData.email, updatedData.phoneNumber, updatedData.role, updatedData.address, originalUser.createdAt);
        userService.update(index, updatedUser);
        renderTable();
    });
    cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.addEventListener("click", renderTable);
    attachRowEvents();
}
loadBtn.addEventListener("click", function () {
    userService.reset();
    renderTable();
    loadBtn.textContent = "Refresh data";
    document.getElementById("userTable").style.display = "table";
});
