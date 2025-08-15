"use client";
import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState<number>();
  const [description, setDescription] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && description) {
      try {
        const response = await fetch("http://localhost:3001/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, description }),
        });
        if (!response.ok) {
          throw new Error("Failed to add transaction");
        }
        const data = await response.json();
        console.log("Transaction added:", data);
        // Reset form fields
        setAmount(undefined);
        setDescription("");
      } catch (error) {
        console.error("Error adding transaction:", error);
      }
    } else {
      console.error("Amount and description are required");
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form>
          <input
            type="number"
            placeholder="Transaction Amount"
            value={amount}
            onChange={(e) => {
              setAmount(parseInt(e.target.value));
            }}
          />
          <input
            type="text"
            placeholder="Transaction Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={(e) => {
              // Handle form submission
              handleSubmit(e);
            }}
          >
            Add Transaction
          </button>
        </form>
      </main>
    </div>
  );
}
