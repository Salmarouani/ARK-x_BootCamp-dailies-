import { readUsers, writeUsers } from "./storage.js";
import { MAX_WITHDRAW_PER_TRANSACTION, MAX_WITHDRAW_PER_DAY } from "./limits.js";

export async function checkBalance(accountID) {
  const users = await readUsers();
  const user = users.find(u => u.accountID === accountID);
  return user?.balance ?? null;
}

export async function deposit(accountID, amount) {
  const users = await readUsers();
  const user = users.find(u => u.accountID === accountID);
  if (!user) throw new Error("User not found");
  if (amount <= 0) throw new Error("Amount must be positive");

  user.balance += amount;
  user.transactions.push({
    type: "deposit",
    amount,
    date: new Date().toISOString()
  });

  await writeUsers(users);
}

export async function withdraw(accountID, amount) {
  const users = await readUsers();
  const user = users.find(u => u.accountID === accountID);
  if (!user) throw new Error("User not found");
  if (amount <= 0) throw new Error("Amount must be positive");
  if (amount > user.balance) throw new Error("Insufficient funds");

  // 1️⃣ Check per-transaction limit
  if (amount > MAX_WITHDRAW_PER_TRANSACTION) {
    throw new Error(`Cannot withdraw more than $${MAX_WITHDRAW_PER_TRANSACTION} in a single transaction`);
  }

  // 2️⃣ Check per-day limit
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const todayWithdrawals = user.transactions
    .filter(tx => tx.type === "withdraw" && tx.date.startsWith(today))
    .reduce((sum, tx) => sum + tx.amount, 0);

  if (todayWithdrawals + amount > MAX_WITHDRAW_PER_DAY) {
    throw new Error(`Daily withdrawal limit of $${MAX_WITHDRAW_PER_DAY} exceeded`);
  }

  // Proceed with withdrawal
  user.balance -= amount;
  user.transactions.push({
    type: "withdraw",
    amount,
    date: new Date().toISOString()
  });

  await writeUsers(users);
}

export async function viewTransactions(accountID) {
  const users = await readUsers();
  const user = users.find(u => u.accountID === accountID);
  return user?.transactions ?? null;
}
