// script.js — frontend logic (guichet)
const API = "http://localhost:3000"; // server base URL — change if needed

// DOM
const auth = document.getElementById("auth");
const dashboard = document.getElementById("dashboard");
const inputAccount = document.getElementById("input-account");
const inputPin = document.getElementById("input-pin");
const authMsg = document.getElementById("auth-msg");

const userNameEl = document.getElementById("user-name");
const accountIdEl = document.getElementById("account-id");
const balanceEl = document.getElementById("balance");
const limitPerTxEl = document.getElementById("limit-per-tx");
const limitDayEl = document.getElementById("limit-day");
const txForm = document.getElementById("tx-form");
const txAmount = document.getElementById("tx-amount");
const txMsg = document.getElementById("tx-msg");
const historySec = document.getElementById("history");
const historyList = document.getElementById("history-list");

let currentUser = null;
let currentAction = null; // 'deposit' | 'withdraw'
let limits = { perTransaction: "—", perDay: "—" };

// fetch limits from server
async function loadLimits() {
  try {
    const res = await fetch(`${API}/limits`);
    const json = await res.json();
    if (json.success) {
      limits = { perTransaction: json.perTransaction, perDay: json.perDay };
      limitPerTxEl.innerText = json.perTransaction;
      limitDayEl.innerText = json.perDay;
    }
  } catch (err) {
    console.warn("Could not load limits:", err.message);
  }
}

// helpers
function show(el){ el.classList.remove("hidden"); }
function hide(el){ el.classList.add("hidden"); }
function format(n){ return Number(n).toFixed(2); }

function showDashboard() {
  if (!currentUser) return;
  userNameEl.innerText = currentUser.name || "Customer";
  accountIdEl.innerText = `ID: ${currentUser.accountID}`;
  balanceEl.innerText = format(currentUser.balance || 0);
  hide(auth);
  show(dashboard);
  hide(txForm);
  hide(historySec);
  txMsg.textContent = "";
  txAmount.value = "";
}

// login
document.getElementById("btn-login").addEventListener("click", async () => {
  const accountID = inputAccount.value.trim();
  const pin = inputPin.value.trim();
  authMsg.textContent = "";

  if (!accountID || !pin) { authMsg.textContent = "Please enter accountID and PIN"; return; }

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ accountID, pin })
    });
    const json = await res.json();
    if (!json.success) {
      authMsg.textContent = json.message || "Login failed";
      return;
    }
    currentUser = json.user;
    await loadLimits();
    showDashboard();
  } catch (err) {
    authMsg.textContent = "Network error — is backend running?";
  }
});

// register
document.getElementById("btn-register").addEventListener("click", async () => {
  const name = inputAccount.value.trim() || prompt("Enter name to register:");
  if (!name) return;
  try {
    const res = await fetch(`${API}/register`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ name })
    });
    const json = await res.json();
    if (!json.success) { authMsg.textContent = json.message || "Registration failed"; return; }
    const u = json.user;
    authMsg.style.color = "green";
    authMsg.textContent = `Created ${u.accountID} — PIN: ${u.pin}`;
    // pre-fill fields so user can quickly login
    inputAccount.value = u.accountID;
    inputPin.value = u.pin;
    authMsg.style.color = "";
  } catch (err) {
    authMsg.textContent = "Network/register error";
  }
});

// deposit/withdraw buttons
document.getElementById("btn-deposit").addEventListener("click", () => {
  currentAction = "deposit"; txAmount.value = ""; txMsg.textContent = ""; show(txForm);
});
document.getElementById("btn-withdraw").addEventListener("click", () => {
  currentAction = "withdraw"; txAmount.value = ""; txMsg.textContent = ""; show(txForm);
});

// submit tx
document.getElementById("tx-submit").addEventListener("click", async () => {
  const amount = Number(txAmount.value);
  txMsg.textContent = "";
  if (!currentUser) return txMsg.textContent = "Not logged in";
  if (!amount || amount <= 0) return txMsg.textContent = "Enter a valid amount";

  // client-side prechecks using limits
  if (currentAction === "withdraw") {
    if (amount > currentUser.balance) return txMsg.textContent = "Insufficient funds";
    if (limits.perTransaction && amount > limits.perTransaction) return txMsg.textContent = `Per-transaction limit: ${limits.perTransaction}`;
    // daily limit enforcement should be checked server-side (we rely on server)
  }

  try {
    const route = currentAction === "deposit" ? "/deposit" : "/withdraw";
    const res = await fetch(`${API}${route}`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ accountID: currentUser.accountID, amount })
    });
    const json = await res.json();
    if (!json.success) {
      txMsg.textContent = json.message || "Transaction failed";
      return;
    }
    // fetch updated balance and transactions
    const balRes = await fetch(`${API}/balance/${currentUser.accountID}`);
    const balJson = await balRes.json();
    if (balJson.success) currentUser.balance = balJson.balance;
    // update local transaction list by reloading from server
    const txRes = await fetch(`${API}/transactions/${currentUser.accountID}`);
    const txJson = await txRes.json();
    if (txJson.success) currentUser.transactions = txJson.transactions;
    showDashboard();
  } catch (err) {
    txMsg.textContent = "Network error";
  }
});

// cancel tx
document.getElementById("tx-cancel").addEventListener("click", () => hide(txForm));

// history
document.getElementById("btn-history").addEventListener("click", async () => {
  if (!currentUser) return;
  try {
    const res = await fetch(`${API}/transactions/${currentUser.accountID}`);
    const json = await res.json();
    if (!json.success) return alert("Could not load transactions");
    historyList.innerHTML = "";
    json.transactions.slice().reverse().forEach(t => {
      const li = document.createElement("li");
      li.textContent = `${t.date.slice(0,19).replace('T',' ')} — ${t.type.toUpperCase()}: ${format(t.amount)}`;
      li.className = t.type;
      historyList.appendChild(li);
    });
    show(historySec);
    hide(txForm);
  } catch {
    alert("Network error");
  }
});
document.getElementById("history-back").addEventListener("click", () => { hide(historySec); });

// logout
document.getElementById("btn-logout").addEventListener("click", () => {
  currentUser = null;
  inputAccount.value = inputPin.value = "";
  hide(dashboard); show(auth);
});

// on load
loadLimits();
