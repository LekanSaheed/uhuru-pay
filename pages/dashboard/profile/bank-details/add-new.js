import React, { useState, useEffect } from "react";
import ProfileWrapper from "../../../../components/ProfileWrapper";
import Select from "react-select";
import { banks } from "../../../../components/ngBanks";
import { Box, TextField, Button } from "@material-ui/core";
import toast from "react-hot-toast";
import { baseUrl } from "../../../../context/baseUrl";
import { useGlobalContext } from "../../../../context/context";
import { useRouter } from "next/router";
const AddNew = () => {
  const _ngBanks = banks.map((bank) => {
    return {
      value: bank.code,
      label: bank.name,
    };
  });
  const [account_number, setAccount_number] = useState("");
  const [bank, setBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const router = useRouter();
  const { user } = useGlobalContext();
  useEffect(() => {
    user.role === "admin" && router.push("/");
  }, []);
  const addBank = async () => {
    setLoading(true);
    toast.loading("Adding Account...");
    const url = `${baseUrl}/accounts/new`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        account_number: account_number,
        account_bank: bank.value ? bank.value : "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.dismiss();
          toast.success("Account added Successfully");
          setBank("");
          setAccount_number("");
        } else {
          toast.dismiss();
          toast.error(data.error);
        }
      })
      .catch((err) => {
        toast.dismiss();
        console.log(err);
      });
  };
  if (user.role === "admin") {
    router.push("/");
  }
  return (
    <ProfileWrapper>
      <Box display="flex" flexDirection="column" padding="10px">
        <div>Add New Bank</div>
        <Box
          display="flex"
          flexDirection="column"
          gridGap="20px"
          gap="20px"
          marginTop="20px"
        >
          <TextField
            label="Account Number"
            value={account_number}
            onChange={(e) => setAccount_number(e.target.value)}
            fullWidth={true}
            size="small"
            placeholder="Account Number"
            variant="outlined"
          />
          <Select
            placeholder="Select a bank"
            value={bank}
            onChange={(e) => setBank(e)}
            options={_ngBanks}
          />
          <Button
            variant="outlined"
            style={{ color: "#4bc2bc", borderColor: "#4bc2bc" }}
            size="large"
            onClick={addBank}
            fullWidth={true}
          >
            Add Account
          </Button>
        </Box>
      </Box>
    </ProfileWrapper>
  );
};

export default AddNew;
