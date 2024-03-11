export function QuoteTableCell(props: { children: string; header?: boolean }) {
  return (
    <div
      style={{
        textAlign: 'left',
        paddingLeft: 15,
        borderRight: 'solid 1px black',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {props.children}
    </div>
  );
}
