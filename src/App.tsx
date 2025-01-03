import React, { useState, useEffect } from "react";

// Import Particle Auth hooks and provider
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/authkit";
import { ethers, Eip1193Provider } from "ethers"; // Eip1193Provider is the interface for the injected BrowserProvider

// UI component
import Header from "./components/Header";
import TxNotification, { TransactionStatus } from "./components/TxNotification";

// Import the utility functions
import { formatBalance, truncateAddress } from "./utils/utils";

const App: React.FC = () => {
  // Hooks to manage logins, data display, and transactions
  const { connect, disconnect, connectionStatus, connected } = useConnect();
  const { address, provider, chainInfo } = useEthereum();
  const { userInfo } = useAuthCore();
  const [balance, setBalance] = useState<string>(""); // states for fetching and display the balance
  const [recipientAddress, setRecipientAddress] = useState<string>(""); // states to get the address to send tokens to from the UI
  const [transactionHash, setTransactionHash] = useState<string | null>(null); // states for the transaction hash
  const [isSending, setIsSending] = useState<boolean>(false); // state to display 'Sending...' while waiting for a hash
  const [error, setError] = useState<string | null>(null);
  const [isInsufficientBalance, setInsufficientBalance] = useState(false);

  const sendEthAmount = 0.00001;
  // Create provider instance with ethers V6
  // use new ethers.providers.Web3Provider(provider, "any"); for Ethers V5
  const ethersProvider = new ethers.BrowserProvider(
    provider as Eip1193Provider,
    "any"
  );

  // Fetch the balance when userInfo or chainInfo changes
  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, chainInfo]);

  // Fetch the user's balance in Ether
  const fetchBalance = async () => {
    try {
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      const balanceResponse = await ethersProvider.getBalance(address);
      const balanceInEther = ethers.formatEther(balanceResponse); // ethers V5 will need the utils module for those convertion operations
      const fixedBalance = formatBalance(balanceInEther);

      setBalance(fixedBalance);
      const isInsufficientBalance = Number(fixedBalance) < sendEthAmount;
      setInsufficientBalance(isInsufficientBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleLogin = async () => {
    try {
      if (!connected) {
        await connect({});
      }
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  // Execute an Ethereum transaction
  // Simple transfer in this example

  const executeTxEvm = async () => {
    setIsSending(true);
    setError(null);
    const signer = await ethersProvider.getSigner();
    const tx = {
      to: recipientAddress,
      value: ethers.parseEther("0.00001"),
      data: "0x", // data is needed only when interacting with smart contracts. 0x equals to zero and it's here for demonstration only
    };

    try {
      const txResponse = await signer.sendTransaction(tx);
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setTransactionHash(txReceipt.hash);
      } else {
        console.error("Transaction receipt is null");
      }
    } catch (error) {
      const message = `Error executing EVM transaction: ${error}`;
      console.error(message);
      setError(message);
    } finally {
      setIsSending(false);
    }
  };

  // The UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-black text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm mx-auto mb-4">
          <h2 className="text-md font-semibold text-white">
            Status: {connectionStatus}
          </h2>
        </div>
        {!userInfo ? (
          <div className="login-section">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              onClick={handleLogin}>
              Sign in with Particle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="border border-blue-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2 text-white">
                Accounts info
              </h2>
              <div className="flex items-center">
                <h2 className="text-lg font-semibold mb-2 text-white mr-2">
                  Name: {userInfo.name}
                </h2>
                <img
                  src={userInfo.avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                  onError={(error) =>
                    console.error("Error in avatar load", error)
                  }
                />
              </div>
              <h2 className="text-lg font-semibold mb-2 text-white">
                Address: <code>{truncateAddress(address || "")}</code>
              </h2>
              <h3 className="text-lg mb-2 text-gray-400">
                Chain: {chainInfo.name}
              </h3>
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-blue-400 mr-2">
                  Balance: {balance} {chainInfo.nativeCurrency.symbol}
                </h3>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center"
                  onClick={fetchBalance}>
                  🔄
                </button>
              </div>
              <div>
                <button
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  onClick={handleDisconnect}>
                  Disconnect
                </button>
              </div>
            </div>
            <div className="border border-blue-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2 text-white">
                Send a transaction
              </h2>
              <h2 className="text-lg">Send {sendEthAmount} ETH</h2>
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="mt-4 p-2 w-full rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                onClick={executeTxEvm}
                disabled={!recipientAddress || isSending}>
                {isSending ? "Sending..." : "Send 0.00001 ETH"}
              </button>
              {isInsufficientBalance && (
                <TxNotification
                  title="Insufficient balance"
                  status={TransactionStatus.warning}
                />
              )}
              {error && (
                <TxNotification
                  title={error}
                  status={TransactionStatus.error}
                />
              )}
              {transactionHash && (
                <TxNotification
                  title="Transaction Successful!"
                  status={TransactionStatus.success}
                  hash={transactionHash}
                  blockExplorerUrl={chainInfo.blockExplorers?.default.url || ""}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
