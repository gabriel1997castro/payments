"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount), // Convert string to number since form inputs return strings
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Clear form and show success message
      setAmount(0);
      setDescription("");
      setMessage("Transaction created successfully!");
      
      // Redirect to transactions page after a short delay to show the success message
      setTimeout(() => {
        router.push('/transactions');
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gray-900">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700"
        >
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-200"
            >
              Transaction Amount
            </label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
              }}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-200"
            >
              Transaction Description
            </label>
            <input
              id="description"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Add Transaction
          </button>
          {message && <p>{message}</p>}
        </form>
      </main>
    </div>
  );
}
