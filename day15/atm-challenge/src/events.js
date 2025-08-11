import { EventEmitter } from "events";
import { deposit, withdraw, checkBalance, viewTransactions } from "./atm.js";

export const atmEmitter = new EventEmitter();

atmEmitter.on("deposit", async (accountID, amount) => {
  try {
    await deposit(accountID, amount);
    console.log(`✅ Deposited $${amount}`);
  } catch (err) {
    console.error(`❌ ${err.message}`);
  }
});

atmEmitter.on("withdraw", async (accountID, amount) => {
  try {
    await withdraw(accountID, amount);
    console.log(`✅ Withdrew $${amount}`);
  } catch (err) {
    console.error(`❌ ${err.message}`);
  }
});

atmEmitter.on("checkBalance", async (accountID) => {
  const balance = await checkBalance(accountID);
  console.log(`💰 Balance: $${balance}`);
});

atmEmitter.on("viewTransactions", async (accountID) => {
  const txs = await viewTransactions(accountID);
  console.log("📜 Transaction History:");
  txs.forEach(tx => {
    console.log(`- ${tx.date}: ${tx.type} $${tx.amount}`);
  });
});
