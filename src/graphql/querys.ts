import { gql } from "graphql-request";

export const getAllProducts = gql`
  query Products {
    products {
      categorie
      color
      createdAt
      id
      name
      price
      description {
        html
      }
      image {
        url
        id
      }
    }
  }
`;
