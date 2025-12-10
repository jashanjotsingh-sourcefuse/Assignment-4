// New TC39 compatible decorator
// New TC39 compatible decorator for Date fields
 function DateFormatter() {
  return function (
    initialValue: any,
    context: ClassFieldDecoratorContext
  ): (this: any, value: any) => any {
    // ensure field
    if (context.kind !== "field") {
      throw new Error("@DateFormatter can only be used on class fields");
    }

    // return initializer function (expected shape when useDefineForClassFields = false)
    return function (this: any, value: any) {
      const v = value == null ? initialValue : value;
      const date = v == null ? null : new Date(v);
      if (!date) return "";
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


enum Role {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  Subscriber = "Subscriber"
}


class User {
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: Role;
  address: string;

  @DateFormatter()  
  createdAt: string | Date;

  constructor(
    firstName: string,
    middleName: string | null,
    lastName: string,
    email: string,
    phoneNumber: string,
    role: Role,
    address: string,
    createdAt: string | Date = new Date()
  ) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.address = address;
    this.createdAt = createdAt;
  }
}


// interface IUserService {
//   getAll(): User[];
//   reset(): void;
//   add(user: User): void;
//   update(index: number, user: User): void;
//   delete(index: number): void;
// }


// creating the generic interface

interface IGenericService<T>{
  getAll():T[];
  reset():void;
  add(item:T):void;
  update(index:number,item:T):void;
  delete(index:number):void;
}



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


//generic class implementation
class GenericService<T> implements IGenericService<T>{
  private items:T[]=[];
  private originalItems:T[]=[];
  constructor(initialItems:T[]){
    this.originalItems=[...initialItems];
    this.reset();
  }
  getAll():T[]{
    return[...this.items];
  }
  reset(): void {
      this.items=[...this.originalItems];
  }
  add(item: T): void {
      this.items.push(item);
  }
  update(index: number, item: T): void {
      if (index >= 0 && index < this.items.length) {
          this.items[index] = item;
      }
  }
  delete(index: number): void {
      if (index >= 0 && index < this.items.length) {
          this.items.splice(index, 1);
      }
  }
}




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
const userService = new GenericService<User>(initialUsersJson.map(u => {
  return new User(
    u.firstName,
    u.middleName || null,
    u.lastName,
    u.email,
    u.phoneNumber,
    u.role,
    u.address,
    u.createdAt
  );
}));




const loadBtn = document.getElementById("loadUsersBtn") as HTMLButtonElement;
const tableBody = document.getElementById("tableBody") as HTMLElement;


function renderTable(): void {
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


function attachRowEvents(): void {
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


function enterEditMode(index: number): void {
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
    } else {
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

  const saveBtn = document.querySelector(".save-btn") as HTMLButtonElement;
  const cancelBtn = document.querySelector(".cancel-btn") as HTMLButtonElement;

  saveBtn?.addEventListener("click", (event) => {
    const button = event.currentTarget as HTMLButtonElement;
    const row = button.closest("tr") as HTMLTableRowElement;
    if (index < 0 || index >= users.length) return; 
    const originalUser = users[index]; 

    const inputs = row.querySelectorAll<HTMLInputElement>("input[name]");
    const select = row.querySelector<HTMLSelectElement>("select[name='role']")!;

    const updatedData: any = {};

    inputs.forEach((input) => {
      updatedData[input.name] = input.value || null;
    });

    updatedData.role = select.value;

    const updatedUser = new User(
      updatedData.firstName,
      updatedData.middleName,
      updatedData.lastName,
      updatedData.email,
      updatedData.phoneNumber,
      updatedData.role as Role,
      updatedData.address,
      originalUser!.createdAt  
    );

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
  document.getElementById("userTable")!.style.display = "table";
});
