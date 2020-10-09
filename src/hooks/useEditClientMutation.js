import { gql, useMutation } from "@apollo/client";
const editClientQL = gql`
  mutation updateClient{
    updateClient(id: 10037109, input: {cellphone:"3207445211", cedula: "1042440346",  firstName:"dario", lastName:"suarez", address:{streetAddress:"calle 59A", city:"Soledad", country:"Colombia", stateShortCode:"ATL"}}){
      ... on Client{
        __typename,
        cellphone,
        id
      }
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
  let [editClientGQL] = useMutation(editClientQL);
  return editClientGQL;
};
