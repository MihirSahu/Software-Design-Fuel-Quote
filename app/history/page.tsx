import { Form } from '../../components/Form';
import { QuoteTable } from '../../components/QuoteTable';

export default function HistoryPage() {
  return (
    <>
      <Form title="Fuel Quote History" width="80vw" top="20vh">
        <QuoteTable />
      </Form>
    </>
  );
}
