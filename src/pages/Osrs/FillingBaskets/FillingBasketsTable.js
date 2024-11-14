import React, { useState } from 'react';
import { FillingBasketsTableRow } from './FillingBasketsTableRow';

export const FillingBasketsTable = ({ getObjectById }) => {
  return (
    <div>
      <h2>Filling baskets</h2>
      <table style={{ marginBottom: '4rem' }}>
        <thead>
          <th>img</th>
          <th>profit/hr</th>
        </thead>
        <tbody>
          {/* Strawberry basket */}
          <FillingBasketsTableRow
            getObjectById={getObjectById}
            inputs={[
              { itemId: 5376, quantity: 2400 },
              { itemId: 5504, quantity: 12000 },
            ]}
            outputs={[{ itemId: 5406, quantity: 2400 }]}
          ></FillingBasketsTableRow>

          <FillingBasketsTableRow
            getObjectById={getObjectById}
            inputs={[
              { itemId: 5376, quantity: 2400 },
              { itemId: 1963, quantity: 12000 },
            ]}
            outputs={[{ itemId: 5416, quantity: 2400 }]}
          ></FillingBasketsTableRow>

          <FillingBasketsTableRow
            getObjectById={getObjectById}
            inputs={[
              { itemId: 5376, quantity: 2400 },
              { itemId: 1955, quantity: 12000 },
            ]}
            outputs={[{ itemId: 5386, quantity: 2400 }]}
          ></FillingBasketsTableRow>

          <FillingBasketsTableRow
            getObjectById={getObjectById}
            inputs={[
              { itemId: 5376, quantity: 2400 },
              { itemId: 2108, quantity: 12000 },
            ]}
            outputs={[{ itemId: 5396, quantity: 2400 }]}
          ></FillingBasketsTableRow>

          <FillingBasketsTableRow
            getObjectById={getObjectById}
            inputs={[
              { itemId: 5376, quantity: 2400 },
              { itemId: 1982, quantity: 12000 },
            ]}
            outputs={[{ itemId: 5968, quantity: 2400 }]}
          ></FillingBasketsTableRow>
        </tbody>
      </table>
    </div>
  );
};
