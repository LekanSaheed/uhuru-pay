import PinManagement from "../../../components/PinManagement";
import DashBoardWrapper from "../../../components/DashBoardWrapper";
import { baseUrl } from "../../../context/baseUrl";

import React from "react";
import { useGlobalContext } from "../../../context/context";
const Pin = () => {
  return (
    <DashBoardWrapper>
      <PinManagement />
    </DashBoardWrapper>
  );
};

export default Pin;
