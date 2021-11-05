import DashBoardWrapper from "../../components/DashBoardWrapper";
import { baseUrl } from "../../context/baseUrl";
import {useState} from 'react'
export default function AddRevenue(){
    const addRevenue = async() => {
        const
const url = `${baseUrl}/revenue/all`;
const [title, setTitle]
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
       title: title,
       amount: amount,
       sharing: sharing,
       category: category
      }),
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

    
return(
    <DashBoardWrapper>
<form>
    <div>
        <input/>
    </div>
    <div>
        <input/>
    </div>
</form>
    </DashBoardWrapper>
)
}