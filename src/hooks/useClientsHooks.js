import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const clientFieldsQuery = gql`
    fragment clientFieds on Client {
        id
        firstName
        lastName
        cedula,
        cellphone,
        registerDate,
        address

    }
`;

export const getAllClients = gql`
    query getClients {
        clients {
            id,
            firstName,
            lastName,
            cedula,
            lastName,
            registerDate,
            address,
            cellphone

        },
        clientsSearch{

            results{
                id,
                firstName,
                lastName
            },
            currentPage,
            resultsPerPage,
            totalPages
        }
    }

`;

export default (status) => {
    return useQuery(getAllClients, {
        fetchPolicy: "network-only",
        /* headers: {
           Authorization: `Token ${localStorage.getItem('token')}`
         },*/
        variables: {
            status: status,
        },
    });
};
