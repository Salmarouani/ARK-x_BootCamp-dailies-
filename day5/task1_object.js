const person = {
  firstname: "YourFirstName",
  lastname: "YourLastName",
  age: 25,

  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  },

  set fullname(value) {
    const parts = value.split(" ");
    this.firstname = parts[0];
    this.lastname = parts[1];
  }
};
 
console.log(person.fullname); // "YourFirstName YourLastName"
person.fullname = "John Smith";
console.log(person.firstname); // "John"
