export const addSenderAttribute = (result, authUser) => {
    return result.map(row => {
        row.isSender = row.userId === authUser;
        return row;
    });
};