export function Form(props: { title: string; children?: any; top?: string; width?: string }) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: props.top ?? '30vh',
          width: '100vw',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: props.width ?? '20vw',
            display: 'inline-block',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridTemplateRows: 'auto',
              gap: 10,
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 100,
              }}
            >
              {props.title}
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
