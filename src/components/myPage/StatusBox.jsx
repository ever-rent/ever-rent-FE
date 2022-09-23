import React from "react";
import { BorrowStatus } from "./BorrowStatus";
import { RentalStatus } from "./RentalStatus";

export const StatusBox = ({ status }) => {
  return <>{status ? <BorrowStatus /> : <RentalStatus />}</>;
};
