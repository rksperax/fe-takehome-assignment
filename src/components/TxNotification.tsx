import React from "react";
import { truncateAddress } from "../utils/utils";
import classNames from "classnames";
export enum TransactionStatus {
  info = "info",
  success = "success",
  error = "error",
  warning = "warning",
}

interface TransactionLinkProps {
  hash?: string;
  blockExplorerUrl?: string;
  status?: TransactionStatus;
  title?: string;
}

const TxNotification: React.FC<TransactionLinkProps> = ({
  hash,
  blockExplorerUrl,
  status = TransactionStatus.info,
  title = "Coming up!",
}) => {
  const explorerUrl = `${blockExplorerUrl}/tx/${hash}`;
  const textClass = classNames({
    "text-green-500": status === TransactionStatus.success, // Green for success
    "text-red-500": status === TransactionStatus.error, // Red for error
    "text-yellow-500": status === TransactionStatus.warning, // Yellow for warning
    "text-blue-500": status === TransactionStatus.info, // Blue for info
  });
  const borderClass = classNames({
    "border-green-500": status === TransactionStatus.success, // Green for success
    "border-red-500": status === TransactionStatus.error, // Red for error
    "border-yellow-500": status === TransactionStatus.warning, // Yellow for warning
    "border-blue-500": status === TransactionStatus.info, // Blue for info
  });

  return (
    <div className={`mt-4 p-4 border ${borderClass} rounded-lg shadow-lg`}>
      <h3 className={`text-lg font-semibold ${textClass}`}>{title}</h3>
      {status === TransactionStatus.success && hash && (
        <p className="text-white">
          Explorer:{" "}
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-words">
            {truncateAddress(hash)}
          </a>
        </p>
      )}
    </div>
  );
};

export default TxNotification;
