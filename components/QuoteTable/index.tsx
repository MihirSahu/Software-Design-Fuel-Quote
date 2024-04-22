'use client';

import { QuoteTableCell } from './QuoteTableCell';
import { QuoteTableRow } from './QuoteTableRow';

export function QuoteTable(props: { history: any }) {
  // console.log(props.history)
  return (
    <>
      <div
        style={{
          height: '55vh',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            // backgroundColor: 'red',
            gridTemplateColumns: '1fr',
            borderTop: 'solid 1px black',
            borderLeft: 'solid 1px black',
          }}
        >
          <QuoteTableRow header>
            <QuoteTableCell>Date Requested</QuoteTableCell>
            <QuoteTableCell>Gallons Requested</QuoteTableCell>
            <QuoteTableCell>Suggested Price</QuoteTableCell>
            <QuoteTableCell>Total Amount Due</QuoteTableCell>
            <QuoteTableCell>Delivery Address</QuoteTableCell>
            <QuoteTableCell>Delivery Date</QuoteTableCell>
          </QuoteTableRow>
          {props.history.map((quote: any, index: any) => (
            <QuoteTableRow key={index}>
              <QuoteTableCell>{quote['request_date']}</QuoteTableCell>
              <QuoteTableCell>{quote['gallons_requested']}</QuoteTableCell>
              <QuoteTableCell>{quote['suggested_price']}</QuoteTableCell>
              <QuoteTableCell>{quote['amount_due']}</QuoteTableCell>
              <QuoteTableCell>{quote['delivery_address']}</QuoteTableCell>
              <QuoteTableCell>{quote['delivery_date']}</QuoteTableCell>
            </QuoteTableRow>
          ))}
        </div>
      </div>
    </>
  );
}
