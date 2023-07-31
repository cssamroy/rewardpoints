import React, { useEffect, useState } from "react";

function calculateRewards(price) {
  if (price >= 50 && price < 100) {
    return price - 50;
  } else if (price > 100) {
    return 2 * (price - 100) + 50;
  }
  return 0;
}

function fetchTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        // Sample data. Replace this with your actual data structure
        { customerId: "customer1", amount: 120, date: "2023-07-01" },
        { customerId: "customer1", amount: 75, date: "2023-07-15" },
        { customerId: "customer1", amount: 200, date: "2023-08-01" },
        { customerId: "customer2", amount: 150, date: "2023-07-01" },
        { customerId: "customer2", amount: 55, date: "2023-07-20" },
        // ... add more transactions as necessary
      ]);
    }, 2000); // Wait for 2 seconds
  });
}

function RewardsCalculator() {
  const [transactions, setTransactions] = useState([]);
  const [monthlyRewards, setMonthlyRewards] = useState({});
  const [totalRewards, setTotalRewards] = useState({});

  useEffect(() => {
    fetchTransactions().then((transactions) => {
      setTransactions(transactions);

      const monthlyRewards = {};
      const totalRewards = {};

      transactions.forEach((transaction) => {
        const rewards = calculateRewards(transaction.amount);
        const month = new Date(transaction.date).getMonth();

        if (!monthlyRewards[transaction.customerId]) {
          monthlyRewards[transaction.customerId] = {};
        }

        if (!monthlyRewards[transaction.customerId][month]) {
          monthlyRewards[transaction.customerId][month] = 0;
        }

        monthlyRewards[transaction.customerId][month] += rewards;

        if (!totalRewards[transaction.customerId]) {
          totalRewards[transaction.customerId] = 0;
        }

        totalRewards[transaction.customerId] += rewards;
      });

      setMonthlyRewards(monthlyRewards);
      setTotalRewards(totalRewards);
    });
  }, []);

  const getMonthlyRecords = () => {
    return Object.keys(monthlyRewards).map((cust) => {
      return (
        <div>
          {cust}:{" "}
          {Object.keys(monthlyRewards[cust]).map((reward) => (
            <div style={{ marginLeft: "50px" }}>
              {reward}: {monthlyRewards[cust][reward]}
            </div>
          ))}
        </div>
      );
    });
  };

  const getTotalRewards = () => {
    return Object.keys(totalRewards).map((cust) => (
      <div>
        {cust}: {totalRewards[cust]}
      </div>
    ));
  };

  return (
    <>
      <b>Monthly Rewards:</b>
      {getMonthlyRecords()}
      <br />
      <br />
      <div><b>Total Rewards:</b></div>
      {getTotalRewards()}
    </>
  );
}

export default RewardsCalculator;
