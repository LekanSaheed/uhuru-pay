import DashBoardMain from "../../components/DashBoardMain";
import DashBoardWrapper from "../../components/DashBoardWrapper";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../context/context";
import React from "react";
const DashBoard = () => {
  const { isUser } = useGlobalContext();
  const [auth, setAuth] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    if (isUser) {
      setAuth(true);
    } else {
      setAuth(false);
      router.push("/login");
    }
  }, [isUser, setAuth]);

  return (
    <>
      {auth && (
        <DashBoardWrapper>
          <DashBoardMain />
        </DashBoardWrapper>
      )}
    </>
  );
};

export default DashBoard;
