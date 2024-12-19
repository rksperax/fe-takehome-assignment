# Frontend Developer Take-Home Assignment

---

#### **Overview**

Welcome to the Frontend Developer take-home assignment! The goal is to build a React-based application that integrates an **embedded wallet** using **account abstraction (EIP-4337)** and performs a **real userOperation** with a paymaster service on a testnet.

This assignment focuses on your ability to implement a lovely Web3 wallet experience, integrate existing account abstraction, and handle a simple on-chain interaction from the front-end.

---

### **Requirements**

#### **Core Features**
1. **React Application**:
   - Build a single-page React application with a clean and responsive UI.
   
2. **Embedded Wallet Integration**:
   - Use **Dynamic SDK**, **Zerodev SDK**, or an equivalent provider to implement an embedded wallet.

3. **Display Wallet Details**:
   - Show the user’s **wallet address**.
   - Display the **wallet balance** in ETH or another supported testnet token.

4. **Real UserOperation with Paymaster (OPTIONAL)**:
   - Integrate with a **paymaster service** to perform a **gasless transaction** on a testnet.
   - Example userOperation:
     - Send a small amount (e.g., 0.00001 bETH) to a **hardcoded recipient address**.
   - Provide feedback to the user on the transaction status (e.g., pending, success, or error).

---

### **Assignment Details**

#### **1. Embedded Wallet Integration**
- Use an SDK that supports **account abstraction (EIP-4337)**. Dynamic, Zerodev, Biconomy, Particle, Alchemy are all acceptable.
- After wallet connection, display:
  - **Wallet Address**.
  - **Wallet Balance** in ETH or another supported token.

#### **2. User Interface**
- A responsive design with the following features:
  - **Connect Wallet Button**: Allows the user to connect their wallet.
  - **Wallet Details Section**: Displays the wallet address and balance.
  - **Transaction Button**: Initiates a userOperation to send a small amount of ETH.
  - **Design**: Make it look pretty and feel great.

#### **3. Real UserOperation (Optional)**
- Implement a button labeled **“Send Gasless Transaction”** that:
  1. Creates and submits a **userOperation**.
  2. Leverages a **paymaster service** to sponsor gas fees.
  3. Sends a small amount of ETH (e.g., 0.00001 bETH) to a hardcoded recipient address on Base Sepolia.
- Provide feedback to the user on:
  - Transaction status (e.g., pending, success, error).
  - Transaction hash (after successful submission).

---

### **Deliverables**

1. **GitHub Repository**:
   - Push your code as a branch or pull request to this repository.
   - Include a `README.md` with:
     - A brief description of the app.
     - Any assumptions or limitations in your implementation.

2. **Demo (Optional)**:
   - Provide a short video (2-5 minutes) demonstrating the functionality.

---

### **Evaluation Criteria**

#### **Core Features**
- **Wallet Integration**:
  - Successful integration of the embedded wallet with EIP-4337 support.
- **Real UserOperation**:
  - Proper integration with a paymaster service to perform gasless transactions.
- **Transaction Feedback**:
  - Clear status updates for the user throughout the transaction process.

#### **Code Quality**
- Clean, modular, and maintainable code.
- Effective use of React features (e.g., hooks, components).

#### **UI/UX**
- Intuitive and responsive interface.
- Clear and accessible design.
- It just looks and feels great.

#### **Bonus (Optional)**
- Handle edge cases gracefully (e.g., insufficient funds, SDK errors).
- Include unit and integration tests for key components.

---

### **Resources**

- **Dynamic SDK Documentation**: [https://docs.dynamic.xyz](https://docs.dynamic.xyz)
- **Zerodev SDK Documentation**: [https://docs.zerodev.xyz](https://docs.zerodev.xyz)
- **EIP-4337 Explained**: [https://eips.ethereum.org/EIPS/eip-4337](https://eips.ethereum.org/EIPS/eip-4337)
- **Testnets for Ethereum**: [https://chainlist.org](https://chainlist.org)
- **React Documentation**: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
- **Base Faucet**: [https://www.alchemy.com/faucets/base-sepolia](https://www.alchemy.com/faucets/base-sepolia)

---

### **Expected Time Commitment**
This assignment should take approximately **4-6 hours**, focusing on building a functional MVP with clean and maintainable code. Bonus features are not required but can showcase your initiative and creativity.

Good luck, and happy coding! 🚀
