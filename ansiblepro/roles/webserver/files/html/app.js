const apiBase = 'http://localhost:5000'; // Replace with actual backend URL/IP if separate

// LOGIN
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${apiBase}/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (data.success) {
    localStorage.setItem("user_id", data.user_id);
    window.location.href = 'dashboard.html';
  } else {
    alert("Invalid login credentials");
  }
});

// SIGNUP
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userData = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    name: document.getElementById('name').value,
    gender: document.getElementById('gender').value,
    birthdate: document.getElementById('birthdate').value,
    age: document.getElementById('age').value
  };

  const res = await fetch(`${apiBase}/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData)
  });

  const data = await res.json();
  if (data.success) {
    alert("Signup successful. You can now log in.");
    window.location.href = 'index.html';
  } else {
    alert("Signup failed");
  }
});

// DASHBOARD
if (window.location.pathname.includes('dashboard.html')) {
  const userId = localStorage.getItem('user_id');
  if (!userId) window.location.href = 'index.html';

  async function updateBalance() {
    const res = await fetch(`${apiBase}/balance/${userId}`);
    const data = await res.json();
    document.getElementById('balance').textContent = parseFloat(data.balance).toFixed(2);
  }

  window.changeBalance = async (action) => {
    const amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) return alert("Enter a valid amount");

    const delta = action === 'deposit' ? amount : -amount;

    await fetch(`${apiBase}/balance/${userId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ amount: delta })
    });
    updateBalance();
  };

  window.transfer = async () => {
    const to_id = document.getElementById('transfer-to').value;
    const amount = parseFloat(document.getElementById('transfer-amount').value);
    if (!to_id || isNaN(amount) || amount <= 0) return alert("Enter valid recipient and amount");

    const res = await fetch(`${apiBase}/transfer`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        from_id: userId,
        to_id,
        amount
      })
    });

    const data = await res.json();
    if (data.success) {
      alert("Transfer successful");
      updateBalance();
    } else {
      alert("Transfer failed (check balance or recipient ID)");
    }
  };

  updateBalance();
}
``
