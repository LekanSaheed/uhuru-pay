import PinManagement from "../../../components/PinManagement";
import DashBoardWrapper from "../../../components/DashBoardWrapper";
import { baseUrl } from "../../../context/baseUrl";
import cookie from "cookie";
const Pin = (props) => {
  if (props.allRevenues)
    return (
      <DashBoardWrapper>
        <PinManagement allRevenues={props.allRevenues} />
      </DashBoardWrapper>
    );
};

export default Pin;
export async function getServerSideProps(context) {
  const header = cookie.parse(context.req.headers.cookie);
  console.log(header);
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${header.accessToken}`,
    },
  };
  const url = `${baseUrl}/revenue/list`;
  const data = await fetch(url, requestOptions).then((res) => res.json());
  console.log(data);
  if (!data) {
    return {
      fallback: true,
    };
  }
  return {
    props: {
      allRevenues: JSON.parse(JSON.stringify(data.data)),
    },
  };
}
