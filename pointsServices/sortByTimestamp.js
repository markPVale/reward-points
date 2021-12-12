exports.sortByTimestamp = (listOfTransactions) => {
  listOfTransactions.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  })
}
