import React from "react";
import { CheckIn } from "./CheckIn";
import { CheckOut } from "./CheckOut";

export const List = ({ clients }) => {
  console.log(clients);
  return (
    <>
      <div className="row mt-4">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <td className="w-25">
                  <p> Cedula </p>
                </td>
                <td className="w-30">
                  <p> First Name</p>
                </td>
                <td className="w-50">
                  <p> Last Name</p>
                </td>
                <td className="w-50">
                  <p> Address</p>
                </td>
                <td className="w-50">
                  <p> Cellphone</p>
                </td>
                <td className="w-50">
                  <p> Registered Date</p>
                </td>
                <td className="w-50">
                  <p> Action</p>
                </td>
              </tr>
            </thead>
            <tbody>
              {clients.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.cedula}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>{item.cellphone}</td>
                    <td>{item.registerDate}</td>
                    <td>
                      <a href="#">Edit</a>
                    </td>
                    {/*<td>
                      {item.status === "AVAILABLE" ? (
                        <CheckOut petId={item.id} />
                      ) : (
                        <CheckIn petId={item.id} />
                      )}
                    </td>*/}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      ;
    </>
  );
};
