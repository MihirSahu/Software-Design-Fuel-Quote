export function QuoteTableRow(props: { children?: any; header?: boolean }) {
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          backgroundColor: props.header ? '#EEEEEE' : 'none',
          fontWeight: props.header ? 500 : 100,
          borderBottom: '1px solid black',
        }}
      >
        {props.children}
      </div>
    </>
  );
}
