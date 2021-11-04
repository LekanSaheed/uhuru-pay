import Link from "next/link";
const Home = () => {
  return (
    <div>
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>
      <br />
      <Link href="/login">
        <a>login</a>
      </Link>
    </div>
  );
};
export default Home;
