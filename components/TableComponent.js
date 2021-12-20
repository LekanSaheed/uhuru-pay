const TableComponent = ({ children }) => {
  return (
    <div
      style={{
        borderBottom: "solid 2px #4bc2bc",
        display: "flex",
        overflowX: "auto",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default TableComponent;
