import DashBoardMain from "../../components/DashBoardMain";
import DashBoardWrapper from "../../components/DashBoardWrapper";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../context/context";
import React from "react";
const DashBoard = () => {
  const { isUser } = useGlobalContext();

  const router = useRouter();
  React.useEffect(() => {
    if (!isUser) {
      router.push("/login");
    }
  });

  return (
    <DashBoardWrapper>
      <DashBoardMain />
    </DashBoardWrapper>
  );
};

export default DashBoard;
