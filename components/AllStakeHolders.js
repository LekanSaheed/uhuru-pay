import { baseUrl, token } from "../context/baseUrl";

const url = `${baseUrl}/stakeholder/list`;

const AllStakeHolders = (props) => {
  console.log(props.stakeholders);
  return <div>Stakeholders list</div>;
};

export default AllStakeHolders;

export async function getServerSideProps() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };

  const stakeholders = await fetch(url, requestOptions)
    .then((res) => res.json())
    .then((data) => data);
  console.log(stakeholders);
  return {
    props: {
      stakeholders: stakeholders,
    },
  };
}
