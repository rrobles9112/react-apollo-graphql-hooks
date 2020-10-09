import { gql, useMutation } from "@apollo/client";
const loginQL = gql`
  mutation($cellphone: String!, $password: String!) {
    login(
      cellphone: $cellphone
      password: $password
    ) {
      ...on AuthInfo{
        token
      }
    }
  }
`;

export default () => {
  let doLogin = useMutation(loginQL)[0];
  return doLogin;
};
