import { GraphQLClient, RequestDocument } from "graphql-request";

export const graphcms = new GraphQLClient(
  process.env.HYPERGRAPH_API_URL as string
);

export const fetcherGraphql = (query: RequestDocument) => {
  console.log(query);
  graphcms.request(query);
};
