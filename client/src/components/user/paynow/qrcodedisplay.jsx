import { useState } from "react";
import { Copy } from "lucide-react"; // Optional icon library (lucide-react or your own)

export default function QRCodeDisplay() {
  const [copied, setCopied] = useState(false);
  const walletAddress = "0xe430d13e782619e5e639160a583600a79f63c235";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getTruncatedAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex flex-col items-center mb-8 px-4">
      <h2 className="text-xl font-semibold mb-2">Scan to Pay</h2>
      <img
        src="/qrcode.jpg" // from public folder
        alt="Payment QR Code"
        className="w-60 border rounded shadow mb-4"
      />

      <h2 className="text-xl font-semibold mb-2">Wallet Address</h2>
      <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md shadow-md">
        <span className="text-blue-600 text-sm font-mono select-all">
          {getTruncatedAddress(walletAddress)}
        </span>
        <button
          onClick={handleCopy}
          className="text-blue-600 hover:text-blue-800 transition"
          title="Copy"
        >
          <Copy size={18} />
        </button>
      </div>
      {copied && <p className="text-green-600 text-sm mt-1">Copied!</p>}
    </div>
  );
}
