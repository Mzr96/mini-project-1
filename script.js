// Class implimentation

class User {
  constructor(userName, firstName, lastName, password, email) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
  }
}

class App {
  #users = [
    {
      userName: "mzr96",
      firstName: "Maziar",
      lastName: "Moslemi",
      password: "1375628",
      email: "maziarmoslemi@gmail.com",
    },
    {
      userName: "boss",
      firstName: "Steve",
      lastName: "Jobs",
      password: "lisa1955",
      email: "stevejobs@apple.com",
    },
    {
      userName: "magnificent",
      firstName: "Leonardo",
      lastName: "da Vinci",
      password: "monaLisa1459",
      email: "leo@thegreatest.com",
    },
  ];
  constructor() {}

  addToUsers(userName, firstName, lastName, password, email) {
    const newUser = new User(userName, firstName, lastName, password, email);
    this.#users.push(newUser);
  }

  getUsers() {
    return this.#users;
  }

  findUser(userName) {
    return this.#users.find((user) => user.userName === userName);
  }

  checkPassword(user, password) {
    return user.password === password ? true : false;
  }

  isUserNameUnique(userName) {
    if (this.#users.findIndex((user) => user.userName === userName) !== -1) {
      alert("user name is already exist!");
      return false;
    }
    return true;
  }
}

class DOM {
  constructor() {
    const signInForm = document.querySelector(".sign-in-form");
    const signInformBtn = document.querySelector(".sign-in-form__btn");
    const header = document.querySelector(".header");
    const signUpForm = document.querySelector(".sign-up-form");
    const signUpformBtn = document.querySelector(".sign-up-form__btn");
    const modalBtn = document.querySelector(".sign-up-modal__btn");

    modalBtn.addEventListener("click", () => {
      this.hideMoadl();
    });

    header.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn--green")) {
        this.showSignInForm();
        this.clearSignInError();
      }
      if (e.target.classList.contains("btn--green-border"))
        this.showSignUpForm();
    });

    signInformBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!signInForm.checkValidity()) signInForm.reportValidity();
      if (!signInForm.checkValidity()) return;
      this.signIn();
      signInForm.reset();
    });

    signUpformBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!signUpForm.checkValidity()) signUpForm.reportValidity();
      if (!signUpForm.checkValidity()) return;
      this.signUp();
    });
  }

  signUp() {
    const firstNameInput = document.querySelector(
      "#sign-up-first-name-input"
    ).value;
    const lastNameInput = document.querySelector(
      "#sign-up-last-name-input"
    ).value;
    const emailInput = document.querySelector("#sign-up-email-input").value;
    const userNameInput = document
      .querySelector("#sign-up-user-name-input")
      .value.toLowerCase();
    const passwordInput = document.querySelector(
      "#sign-up-password-input"
    ).value;
    const signUpForm = document.querySelector(".sign-up-form");

    if (!app.isUserNameUnique(userNameInput)) return;
    app.addToUsers(
      userNameInput,
      firstNameInput,
      lastNameInput,
      passwordInput,
      emailInput
    );
    signUpForm.reset();
    this.showMoadl();
    this.showSignInForm();
  }

  signIn() {
    const userNameInput = document.querySelector("#sign-in-user-name-input");
    const passwordInput = document.querySelector("#sign-in-password-input");
    const user = app.findUser(userNameInput.value);
    if (!user || !app.checkPassword(user, passwordInput.value))
      this.signInError();
    if (!user || !app.checkPassword(user, passwordInput.value)) return;
    this.clearSignInError();
    this.renderUsersTableData(app.getUsers());
    this.showTable();
  }

  signInError() {
    const errorContainer = document.querySelector(".sign-in-form__error");
    errorContainer.textContent = "Wrong username or password";
  }

  clearSignInError() {
    const errorContainer = document.querySelector(".sign-in-form__error");
    errorContainer.textContent = "";
  }

  renderUsersTableData(usersList) {
    const table = document.querySelector(".users-table");
    this.renderUsersTableHeader();
    usersList.forEach((user) => {
      const html = `
        <tr class="user-row">
          <td class="user-row__user-name">${user.userName}</td>
          <td class="user-row__first-name">${user.firstName}</td>
          <td class="user-row__last-name">${user.lastName}</td>
          <td class="user-row__email">${user.email}</td>
        </tr>`;
      table.insertAdjacentHTML("beforeend", html);
    });
  }

  renderUsersTableHeader() {
    const table = document.querySelector(".users-table");
    table.innerHTML = `
      <tr class="users-table__header-row">
          <th>UserName</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>`;
  }

  showTable() {
    document.querySelector(".users-table").classList.remove("hidden");
    document.querySelector(".sign-in-form").classList.add("hidden");
    document.querySelector(".sign-up-form").classList.add("hidden");
  }

  showSignInForm() {
    document.querySelector(".users-table").classList.add("hidden");
    document.querySelector(".sign-in-form").classList.remove("hidden");
    document.querySelector(".sign-up-form").classList.add("hidden");
  }

  showSignUpForm() {
    document.querySelector(".users-table").classList.add("hidden");
    document.querySelector(".sign-in-form").classList.add("hidden");
    document.querySelector(".sign-up-form").classList.remove("hidden");
  }
  showMoadl() {
    document.querySelector(".sign-up-modal-box").classList.remove("hidden");
  }
  hideMoadl() {
    document.querySelector(".sign-up-modal-box").classList.add("hidden");
  }
}

const app = new App();
const dom = new DOM();
