import {
  GraphQLClient,
  RequestDocument,
  RequestOptions,
} from "graphql-request";

export const graphcms = new GraphQLClient(
  process.env.HYPERGRAPH_API_URL as string
);

export const fetcherGraphql = (query: RequestDocument, variables: any) => {
  graphcms.request(query, variables);
};
