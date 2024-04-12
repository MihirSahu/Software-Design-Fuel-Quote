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
            <QuoteTableCell>Gallons Requested</QuoteTableCell>
            <QuoteTableCell>Delivery Address</QuoteTableCell>
            <QuoteTableCell>Delivery Date</QuoteTableCell>
            <QuoteTableCell>Price / Gallon</QuoteTableCell>
            <QuoteTableCell>Total Amount Due</QuoteTableCell>
            <QuoteTableCell>Request Date</QuoteTableCell>
          </QuoteTableRow>
          {props.history.map((quote: any, index: any) => (
            <QuoteTableRow key={index}>
              <QuoteTableCell>{quote['gallons_requested']}</QuoteTableCell>
              <QuoteTableCell>{quote['delivery_address']}</QuoteTableCell>
              <QuoteTableCell>{quote['delivery_date']}</QuoteTableCell>
              <QuoteTableCell>{quote['price']}</QuoteTableCell>
              <QuoteTableCell>{quote['amount_due']}</QuoteTableCell>
              <QuoteTableCell>{quote['request_date']}</QuoteTableCell>
            </QuoteTableRow>
          ))}
          {/*
          <QuoteTableRow>
            <QuoteTableCell>15</QuoteTableCell>
            <QuoteTableCell>1234 Main Street ...</QuoteTableCell>
            <QuoteTableCell>02/24/2024 04:00 PM</QuoteTableCell>
            <QuoteTableCell>$5.23</QuoteTableCell>
            <QuoteTableCell>$78.45</QuoteTableCell>
            <QuoteTableCell>02/23/2024 05:30 PM</QuoteTableCell>
          </QuoteTableRow>
          <QuoteTableRow>
            <QuoteTableCell>15</QuoteTableCell>
            <QuoteTableCell>1234 Main Street ...</QuoteTableCell>
            <QuoteTableCell>02/24/2024 04:00 PM</QuoteTableCell>
            <QuoteTableCell>$5.23</QuoteTableCell>
            <QuoteTableCell>$78.45</QuoteTableCell>
            <QuoteTableCell>02/23/2024 05:30 PM</QuoteTableCell>
          </QuoteTableRow>
          <QuoteTableRow>
            <QuoteTableCell>15</QuoteTableCell>
            <QuoteTableCell>1234 Main Street ...</QuoteTableCell>
            <QuoteTableCell>02/24/2024 04:00 PM</QuoteTableCell>
            <QuoteTableCell>$5.23</QuoteTableCell>
            <QuoteTableCell>$78.45</QuoteTableCell>
            <QuoteTableCell>02/23/2024 05:30 PM</QuoteTableCell>
          </QuoteTableRow>
          <QuoteTableRow>
            <QuoteTableCell>15</QuoteTableCell>
            <QuoteTableCell>1234 Main Street ...</QuoteTableCell>
            <QuoteTableCell>02/24/2024 04:00 PM</QuoteTableCell>
            <QuoteTableCell>$5.23</QuoteTableCell>
            <QuoteTableCell>$78.45</QuoteTableCell>
            <QuoteTableCell>02/23/2024 05:30 PM</QuoteTableCell>
          </QuoteTableRow>
          <QuoteTableRow>
            <QuoteTableCell>15</QuoteTableCell>
            <QuoteTableCell>1234 Main Street ...</QuoteTableCell>
            <QuoteTableCell>02/24/2024 04:00 PM</QuoteTableCell>
            <QuoteTableCell>$5.23</QuoteTableCell>
            <QuoteTableCell>$78.45</QuoteTableCell>
            <QuoteTableCell>02/23/2024 05:30 PM</QuoteTableCell>
          </QuoteTableRow>
          <QuoteTableRow>
            <QuoteTableCell>15</QuoteTableCell>
            <QuoteTableCell>1234 Main Street ...</QuoteTableCell>
            <QuoteTableCell>02/24/2024 04:00 PM</QuoteTableCell>
            <QuoteTableCell>$5.23</QuoteTableCell>
            <QuoteTableCell>$78.45</QuoteTableCell>
            <QuoteTableCell>02/23/2024 05:30 PM</QuoteTableCell>
          </QuoteTableRow>
          <QuoteTableRow>
            <QuoteTableCell>15</QuoteTableCell>
            <QuoteTableCell>1234 Main Street ...</QuoteTableCell>
            <QuoteTableCell>02/24/2024 04:00 PM</QuoteTableCell>
            <QuoteTableCell>$5.23</QuoteTableCell>
            <QuoteTableCell>$78.45</QuoteTableCell>
            <QuoteTableCell>02/23/2024 05:30 PM</QuoteTableCell>
          </QuoteTableRow>
          <QuoteTableRow>
            <QuoteTableCell>15</QuoteTableCell>
            <QuoteTableCell>1234 Main Street ...</QuoteTableCell>
            <QuoteTableCell>02/24/2024 04:00 PM</QuoteTableCell>
            <QuoteTableCell>$5.23</QuoteTableCell>
            <QuoteTableCell>$78.45</QuoteTableCell>
            <QuoteTableCell>02/23/2024 05:30 PM</QuoteTableCell>
          </QuoteTableRow>
        */}
        </div>
      </div>
    </>
  );
}
