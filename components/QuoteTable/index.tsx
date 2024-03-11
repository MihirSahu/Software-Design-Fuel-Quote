import { QuoteTableCell } from './QuoteTableCell';
import { QuoteTableRow } from './QuoteTableRow';

export function QuoteTable() {
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
        </div>
      </div>
    </>
  );
}
