// due to limitatiosn with pupeteer evaluate(), all code must be within same scope
module.exports = () => {
  const tableLabelMap = {
    0: 'symbol',
    1: 'orderDate',
    2: 'transactionDate',
    3: 'type',
    4: 'amount',
    5: 'price',
    6: 'volume',
  };

  // yeah, I already tried using moment()
  const parseDate = (dateString) => {

  };

  const parseTransactionRow = (node) => {
    const cells = node.querySelectorAll('td');
    const acc = {};
    cells.forEach((cell, index) => {
      const label = tableLabelMap[index];
      return Object.assign(acc, { [label]: cell.innerText });
    });

    return acc;
  };

  const massage = (history) => {
    return history.map((transaction) => {
      return Object.assign({}, transaction, {
        [tableLabelMap[1]]: new Date(transaction[tableLabelMap[1]]),
        [tableLabelMap[2]]: new Date(transaction[tableLabelMap[2]]),
        [tableLabelMap[6]]: transaction[tableLabelMap[4]] * transaction[tableLabelMap[5]],
      });
    });
  };

  const parseHistoryFromDom = () => {
    const history = []; // reduce doesn't work on nodeLists.
    $('.ranking')[0].querySelector('tbody').querySelectorAll('tr').forEach((node) => {
      const transactionRecord = parseTransactionRow(node);
      history.push(transactionRecord);
    });

    return massage(history);
  };

  return parseHistoryFromDom();
};
