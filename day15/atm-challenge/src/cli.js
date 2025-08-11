import readline from "readline";
import { registerUser, authenticate } from "./auth.js";
import { atmEmitter } from "./events.js";

// Import limits from atm.js
import { MAX_WITHDRAW_PER_TRANSACTION, MAX_WITHDRAW_PER_DAY } from "./limits.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, answer => resolve(answer)));
}

export async function mainMenu() {
  console.log("\n=== ATM CLI ===");
  console.log("1. Register");
  console.log("2. Login");
  console.log("3. Exit");

  const choice = await question("> ");
  if (choice === "1") {
    const name = await question("Enter your name: ");
    const user = await registerUser(name);
    console.log(`✅ Account created! ID: ${user.accountID}, PIN: ${user.pin}`);
    await mainMenu();
  } else if (choice === "2") {
    const accountID = await question("Account ID: ");
    const pin = await question("PIN: ");
    const user = await authenticate(accountID, pin);
    if (user) {
      console.log(`\n👋 Welcome, ${user.name}!`);
      console.log(`💵 Withdrawal limits:`);
      console.log(`   - Per transaction: $${MAX_WITHDRAW_PER_TRANSACTION}`);
      console.log(`   - Per day total: $${MAX_WITHDRAW_PER_DAY}`);
      await userMenu(user.accountID);
    } else {
      console.log("❌ Invalid credentials");
      await mainMenu();
    }
  } else {
    rl.close();
  }
}

async function userMenu(accountID) {
  console.log("\n=== ATM Operations ===");
  console.log("1. Check Balance");
  console.log("2. Deposit");
  console.log("3. Withdraw");
  console.log("4. View Transactions");
  console.log("5. Logout");

  const choice = await question("> ");
  if (choice === "1") {
    atmEmitter.emit("checkBalance", accountID);
    setTimeout(() => userMenu(accountID), 500);
  } else if (choice === "2") {
    const amount = parseFloat(await question("Amount to deposit: "));
    atmEmitter.emit("deposit", accountID, amount);
    setTimeout(() => userMenu(accountID), 500);
  } else if (choice === "3") {
    const amount = parseFloat(await question("Amount to withdraw: "));
    atmEmitter.emit("withdraw", accountID, amount);
    setTimeout(() => userMenu(accountID), 500);
  } else if (choice === "4") {
    atmEmitter.emit("viewTransactions", accountID);
    setTimeout(() => userMenu(accountID), 500);
  } else {
    await mainMenu();
  }
}
