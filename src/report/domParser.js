const tableLabelMap = {
  0: 'Symbol',
  1: 'Order Date',
  2: 'Transaction Date',
  3: 'Type',
  4: 'Amount',
  5: 'Price',
  6: 'Volume',
};

const parseTransactionRow = (node) => {
  const cells = node.querySelectorAll('td');
  const acc = {};
  return cells.forEach((cell, index) => {
    const label = tableLabelMap[index];
    return Object.assign(acc, { [label]: cell.innerText });
  });
};

const parseHistoryFromDom = () => {
  const history = []; // reduce doesn't work on nodeLists.
  $('.ranking')[0].querySelector('tbody').querySelectorAll('tr').forEach((node) => {
    const transactionRecord = parseTransactionRow(node);
    history.push(transactionRecord);
  });

  return history;
};

module.exports = {
  parseHistoryFromDom,
};
