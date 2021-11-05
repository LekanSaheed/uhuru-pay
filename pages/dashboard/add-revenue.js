import DashBoardWrapper from "../../components/DashBoardWrapper";
import { baseUrl } from "../../context/baseUrl";
import { useState } from "react";
import Select from "react-select";
import { useGlobalContext } from "../../context/context";

export default function AddRevenue() {
  const { user } = useGlobalContext();
  const url = `${baseUrl}/revenue/new`;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState([]);

  const options = [
    { label: "Transport", value: "transport" },
    { label: "Street Naming", value: "street_naming" },
    { label: "Tenement Rate", value: "tenement_rate" },
    { label: "Toll Gate", value: "toll_gate" },
    { label: "School Fees", value: "school_fees" },
    { label: "Market", value: "market" },
  ];
  const handleCategory = (category) => {
    setCategory(category);
  };
  const addRevenue = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        title: title,
        amount: amount,
        comment: comment,
        category: category.value,
      }),
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <DashBoardWrapper>
      <form>
        <div>
          <label>Title</label>
          <input
            value={title}
            placeholder="Revenue title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            value={amount}
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Category</label>
          <Select
            value={category}
            placeholder="Category"
            options={options}
            onChange={handleCategory}
          />
        </div>
        <div>
          <label>Comment</label>
          <input
            value={comment}
            placeholder="Comment"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button onClick={addRevenue}>Add revenue</button>
      </form>
    </DashBoardWrapper>
  );
}
