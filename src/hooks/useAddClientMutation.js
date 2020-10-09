import { gql, useMutation } from "@apollo/client";
const addClientQL = gql`
  mutation createClient{
    createClient(input:{cellphone:"3207445211", cedula: "1042440346",  firstName:"dario", lastName:"suarez", address:{streetAddress:"calle 59A", city:"Soledad", country:"Colombia", stateShortCode:"ATL"}}){

      ... on Client{
        __typename,
        cellphone
      },
      ... on ValidationErrors{
        errors{
          field,
          message
        }
      }
    }
  }
`;

export default () => {
  let addClientGQL = useMutation(editClientQL)[0];
  return doLogin;
};
