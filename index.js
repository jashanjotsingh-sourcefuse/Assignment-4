"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
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
            const v = value == null ? initialValue : value;
            const date = v == null ? null : new Date(v);
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
let User = (() => {
    var _a;
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    return _a = class User {
            constructor(firstName, middleName, lastName, email, phoneNumber, role, address, createdAt = new Date()) {
                Object.defineProperty(this, "firstName", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "middleName", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "lastName", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "email", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "phoneNumber", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "role", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "address", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                // use the decorator for date formatting
                //createdAt: Date;
                Object.defineProperty(this, "createdAt", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: __runInitializers(this, _createdAt_initializers, void 0)
                });
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
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createdAt_decorators = [DateFormatter()];
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
const initialUsersJson = [
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
class UserService {
    constructor() {
        Object.defineProperty(this, "users", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "originalUsers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.originalUsers = initialUsersJson.map(u => {
            return new User(u.firstName, u.middleName || null, u.lastName, u.email, u.phoneNumber, u.role, u.address, u.createdAt);
        });
        this.reset();
    }
    getAll() {
        return [...this.users];
    }
    reset() {
        this.users = this.originalUsers.map(u => {
            return new User(u.firstName, u.middleName, u.lastName, u.email, u.phoneNumber, u.role, u.address, u.createdAt);
        });
    }
    add(user) {
        this.users.push(user);
    }
    update(index, user) {
        if (index >= 0 && index < this.users.length) {
            this.users[index] = user;
        }
    }
    delete(index) {
        if (index >= 0 && index < this.users.length) {
            this.users.splice(index, 1);
        }
    }
}
const userService = new UserService();
const loadBtn = document.getElementById("loadUsersBtn");
const tableBody = document.getElementById("tableBody");
function renderTable() {
    const users = userService.getAll();
    tableBody.innerHTML = "";
    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${user.firstName}</td>
      <td>${user.middleName || ""}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      <td>${user.phoneNumber}</td>
      <td>${user.role}</td>
      <td>${user.address}</td>
      <td>${(user.createdAt)}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-btn btn btn-primary fa fa-edit" data-index="${index}"></button>
          <button class="delete-btn btn btn-danger fa fa-trash-alt" data-index="${index}"></button>
        </div>
      </td>
    `;
        tableBody.appendChild(row);
    });
    attachRowEvents();
}
function attachRowEvents() {
    const editBtns = document.querySelectorAll(".edit-btn");
    const deleteBtns = document.querySelectorAll(".delete-btn");
    editBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = Number(btn.getAttribute("data-index"));
            enterEditMode(index);
        });
    });
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = Number(btn.getAttribute("data-index"));
            userService.delete(index);
            renderTable();
        });
    });
}
function enterEditMode(index) {
    const users = userService.getAll();
    tableBody.innerHTML = "";
    users.forEach((user, i) => {
        const row = document.createElement("tr");
        if (i === index) {
            row.innerHTML = `
        <td><input name="firstName" value="${user.firstName}" /></td>
        <td><input name="middleName" value="${user.middleName || ""}" /></td>
        <td><input name="lastName" value="${user.lastName}" /></td>
        <td><input name="email" value="${user.email}" /></td>
        <td><input name="phoneNumber" value="${user.phoneNumber}" /></td>
        <td>
          <select name="role">
            ${Object.values(Role)
                .map(r => `<option value="${r}" ${r === user.role ? "selected" : ""}>${r}</option>`)
                .join("")}
          </select>
        </td>
        <td><input name="address" value="${user.address}" /></td>
        <td>${(user.createdAt)}</td>
        <td>
          <button class="save-btn btn btn-success" data-index="${i}">Save</button>
          <button class="cancel-btn btn btn-secondary" data-index="${i}">Cancel</button>
        </td>
      `;
        }
        else {
            row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.middleName || ""}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.role}</td>
        <td>${user.address}</td>
        <td>${user.createdAt}</td>
        <td>
          <button class="edit-btn btn btn-primary fa fa-edit" data-index="${i}"></button>
          <button class="delete-btn btn btn-danger fa fa-trash-alt" data-index="${i}"></button>
        </td>
      `;
        }
        tableBody.appendChild(row);
    });
    const saveBtn = document.querySelector(".save-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    saveBtn?.addEventListener("click", (event) => {
        const button = event.currentTarget;
        const row = button.closest("tr");
        if (index < 0 || index >= users.length)
            return;
        const originalUser = users[index];
        const inputs = row.querySelectorAll("input[name]");
        const select = row.querySelector("select[name='role']");
        const updatedData = {};
        inputs.forEach((input) => {
            updatedData[input.name] = input.value || null;
        });
        updatedData.role = select.value;
        const updatedUser = new User(updatedData.firstName, updatedData.middleName, updatedData.lastName, updatedData.email, updatedData.phoneNumber, updatedData.role, updatedData.address, originalUser.createdAt);
        userService.update(index, updatedUser);
        renderTable();
    });
    cancelBtn?.addEventListener("click", renderTable);
    attachRowEvents();
}
loadBtn.addEventListener("click", () => {
    userService.reset();
    renderTable();
    loadBtn.textContent = "Refresh data";
    document.getElementById("userTable").style.display = "table";
});
//# sourceMappingURL=index.js.map