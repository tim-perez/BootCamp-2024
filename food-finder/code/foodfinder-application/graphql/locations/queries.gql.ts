const queries = `
    allLocations: [Location]!
    locationsById(location_ids: [String]!): [Location]!
    onUserWishlist(user_id: String!): [Location]!
`;

export default queries;