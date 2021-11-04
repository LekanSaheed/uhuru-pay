import AllStakeHolders from "../../../components/AllStakeHolders";
import DashBoardWrapper from "../../../components/DashBoardWrapper";

const Members = (props) => {
  console.log(props.stakeholders, ":Props");
  return (
    <DashBoardWrapper>
      <AllStakeHolders />
    </DashBoardWrapper>
  );
};
export default Members;
