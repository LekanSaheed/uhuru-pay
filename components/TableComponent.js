const TableComponent = ({ children }) => {
  return (
    <div style={{ borderBottom: "solid 2px #4bc2bc", display: "flex" }}>
      {children}
    </div>
  );
};

export default TableComponent;
