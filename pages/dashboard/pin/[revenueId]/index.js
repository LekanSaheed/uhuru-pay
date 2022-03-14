import { useRouter } from "next/router";
import DashBoardWrapper from "../../../../components/DashBoardWrapper";
import { baseUrl } from "../../../../context/baseUrl";
import cookie from "cookie";
import React from "react";
import { useGlobalContext } from "../../../../context/context";
import toast from "react-hot-toast";
const ARevenue = (prop) => {
  const { logout } = useGlobalContext();
  const router = useRouter();
  const [revenue, setRevenue] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchRevenue = async () => {
      const token = localStorage.getItem("accessToken");

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token && token}`,
        },
      };
      const url = `${baseUrl}/revenue/list`;
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      if (data.success === true) {
        setLoading(false);
        const aRevenue = data.data.filter(
          (rev) => rev.revenue_id === router.query.revenueId
        );
        setRevenue([aRevenue]);
      } else {
        toast.error(data.error);
        setLoading(false);
      }
      if (!token) {
        logout();
        toast.error("You have to log in again");
      }
    };
    fetchRevenue();
  }, []);

  return (
    <DashBoardWrapper>
      <div>A revenue</div>
      {loading && "Loading..."}
      <div>
        {revenue.length > 0 && (
          <div>
            {revenue[0].title}
            <span>{revenue[0].amount}</span>
          </div>
        )}
        {!loading && revenue.length === 0 ? "Revenue not found" : ""}
      </div>
    </DashBoardWrapper>
  );
};

export default ARevenue;
export async function getServerSideProps(context) {
  // const revenueId = context.query.revenueId;

  // const header = cookie.parse(context.req.headers.cookie);

  // const requestOptions = {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${header.accessToken}`,
  //   },
  // };
  // const url = `${baseUrl}/pin/${revenueId}/generate`;
  // const res = await fetch(url, requestOptions);
  // const data = await res.json();

  return {
    props: {},
  };
}
