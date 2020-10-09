import { gql, useMutation } from "@apollo/client";
const addClientQL = gql`
  mutation ($input:ClientInput!){
    createClient(input:$input){

      ... on Client{
        __typename,
        id,
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
  let addClientGQL = useMutation(addClientQL)[0];
  return addClientGQL;
};
