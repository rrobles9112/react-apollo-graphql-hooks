import React, { useContext } from "react";
import useCheckoutMutation from "../hooks/useCheckoutMutation";
import { isLoggedIn } from "../services/service";
import { ClientsContext } from "./../providers/refetchProvider";

export const CheckOut = ({ petId }) => {
  const refetch = useContext(ClientsContext);
  const doCheckOut = useCheckoutMutation();
  const checkOut = () => {
    doCheckOut(
      {
        variables: { petId: petId },
      },
      { refetchQueries: [`petsQuery`] }
    )
      .then((_) => {
        refetch();
      })
      .catch((e) => console.log(e));
  };

  if (!isLoggedIn()) {
    return null;
  }

  return (
    <>
      <button onClick={() => checkOut()} className="btn btn-link">
        Check Out
      </button>
    </>
  );
};
