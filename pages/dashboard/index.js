import DashBoardMain from "../../components/DashBoardMain";
import DashBoardWrapper from "../../components/DashBoardWrapper";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../context/context";
import React from "react";
const DashBoard = () => {
  const { isUser, user, setUser } = useGlobalContext();
  const [auth, setAuth] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("stakeholder"));
    if (localUser !== null) {
      setUser(localUser);
      setAuth(true);
    } else {
      setAuth(false);
      router.push("/login");
    }
  }, []);

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
