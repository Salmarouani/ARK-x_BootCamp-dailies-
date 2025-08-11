import { readUsers, writeUsers } from "./storage.js";

// Generate unique accountID
function generateAccountID(users) {
  const lastID = users.length ? parseInt(users[users.length - 1].accountID.slice(3)) : 1000;
  return `ACC${lastID + 1}`;
}

// Generate 4-digit PIN
function generatePIN() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export async function registerUser(name) {
  const users = await readUsers();
  const accountID = generateAccountID(users);
  const pin = generatePIN();

  const newUser = {
    accountID,
    name,
    pin,
    balance: 0,
    transactions: []
  };

  users.push(newUser);
  await writeUsers(users);
  return newUser;
}

export async function authenticate(accountID, pin) {
  const users = await readUsers();
  const user = users.find(u => u.accountID === accountID && u.pin === pin);
  return user || null;
}
