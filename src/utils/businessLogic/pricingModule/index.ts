// src/businessLogic/pricingModule/index.ts

import { Decimal } from 'decimal.js';

async function hasClientRequestedBefore(): Promise<boolean> {
  const response = await fetch(`/actions/quote/checkHistory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user history.');
  }

  const jsonResponse = (await response.json()) as { hasHistory: boolean };
  return jsonResponse.hasHistory;
}

export async function calculateTotalAmount(
  gallonsRequested: number,
  isTexas: boolean
): Promise<{ suggestedPrice: string; totalAmount: string }> {
  
  const currentPrice = new Decimal(1.5); // Static current price per gallon
  const locationFactor = new Decimal(isTexas ? 0.02 : 0.04);

  const hasHistory = await hasClientRequestedBefore();
  const rateHistoryFactor = new Decimal(hasHistory ? 0.01 : 0.0);

  const gallonsRequestedFactor = new Decimal(gallonsRequested > 1000 ? 0.02 : 0.03);
  const companyProfitFactor = new Decimal(0.1);

  const margin = currentPrice.mul(
    locationFactor.minus(rateHistoryFactor).plus(gallonsRequestedFactor).plus(companyProfitFactor)
  );
  const suggestedPrice = currentPrice.plus(margin);
  const totalAmount = new Decimal(gallonsRequested).mul(suggestedPrice);

  return { suggestedPrice: suggestedPrice.toFixed(), totalAmount: totalAmount.toFixed() };
}
