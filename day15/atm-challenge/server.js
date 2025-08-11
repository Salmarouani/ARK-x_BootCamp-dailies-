// server.js
import express from "express";
import cors from "cors";
import { registerUser, authenticate } from "./src/auth.js";
import { checkBalance, deposit, withdraw, viewTransactions } from "./src/atm.js";
import { MAX_WITHDRAW_PER_TRANSACTION, MAX_WITHDRAW_PER_DAY } from "./src/limits.js";

const app = express();
app.use(cors());
app.use(express.json());

// Register new user
app.post("/register", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Name is required" });
    const user = await registerUser(name);
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const { accountID, pin } = req.body;
    if (!accountID || !pin) return res.status(400).json({ success: false, message: "accountID and pin required" });
    const user = await authenticate(accountID, pin);
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get balance
app.get("/balance/:accountID", async (req, res) => {
  try {
    const balance = await checkBalance(req.params.accountID);
    if (balance === null) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, balance });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Deposit
app.post("/deposit", async (req, res) => {
  try {
    const { accountID, amount } = req.body;
    if (!accountID || amount == null) return res.status(400).json({ success: false, message: "accountID and amount required" });
    await deposit(accountID, Number(amount));
    res.json({ success: true, message: "Deposit successful" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Withdraw
app.post("/withdraw", async (req, res) => {
  try {
    const { accountID, amount } = req.body;
    if (!accountID || amount == null) return res.status(400).json({ success: false, message: "accountID and amount required" });
    await withdraw(accountID, Number(amount));
    res.json({ success: true, message: "Withdrawal successful" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Transactions
app.get("/transactions/:accountID", async (req, res) => {
  try {
    const txs = await viewTransactions(req.params.accountID);
    if (txs === null) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, transactions: txs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Limits endpoint (so frontend shows real limits)
app.get("/limits", (req, res) => {
  res.json({
    success: true,
    perTransaction: MAX_WITHDRAW_PER_TRANSACTION,
    perDay: MAX_WITHDRAW_PER_DAY
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ ATM API server running at http://localhost:${PORT}`));
