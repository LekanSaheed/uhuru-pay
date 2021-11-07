import DashBoardMain from "../../components/DashBoardMain";
import DashBoardWrapper from "../../components/DashBoardWrapper";
import Login from "../../components/Login";

import { useRouter } from "next/router";
import { useGlobalContext } from "../../context/context";
import React from "react";
import * as cookie from "cookie";
import { baseUrl } from "../../context/baseUrl";
const DashBoard = (props) => {
  const { isUser, setUser } = useGlobalContext();
  const [auth, setAuth] = React.useState(true);
  const router = useRouter();
  // React.useEffect(() => {
  //   const localUser = JSON.parse(localStorage.getItem("stakeholder"));
  //   if (localUser !== null) {
  //     setUser(localUser);
  //     setAuth(true);
  //   } else {
  //     setAuth(false);
  //     router.push("/login");
  //   }
  // }, []);
  React.useEffect(() => {
    setUser(props.user);
  }, []);

  return (
    <>
      {!isUser ? (
        <Login />
      ) : (
        <DashBoardWrapper>
          <DashBoardMain />
        </DashBoardWrapper>
      )}
    </>
  );
};

export default DashBoard;
export async function getServerSideProps(context) {
  const header = cookie.parse(context.req.headers.cookie);
  console.log(header);
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${header.accessToken}`,
    },
  };
  const url = `${baseUrl}/stakeholder/me`;
  const res = await fetch(url, requestOptions);
  const data = await res.json();
  const user = data.data;
  console.log(header);

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: data.success ? user : {},
    },
  };
}
