"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Transaction {
  id: string;
  amount: number;
  description: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:3001/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load transactions"
        );
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-100">Transactions</h1>
          <Link
            href="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add New Transaction
          </Link>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-300">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-200">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-200">
                      ${transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && !error && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
