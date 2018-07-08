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
    const [date, time] = dateString.split(' ');
    const parsedDate = new Date(date);
    const hours = time[time.length - 1] === 'p' ? parseInt(time[0], 10) + 12 : parseInt(time[0], 10);
    const minutes = `${time[2]}${time[3]}`;
    parsedDate.setHours(hours, minutes);
    return parsedDate;
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
      const orderDate = tableLabelMap[1];
      const transactionDate = tableLabelMap[2];
      const amount = tableLabelMap[4];
      const price = tableLabelMap[5];
      const volume = tableLabelMap[6];
      const parsedPrice = parseFloat(transaction[price].slice(1), 10);
      const parsedAmount = parseInt(transaction[amount].replace(/,/g, ''), 10);

      return Object.assign({}, transaction, {
        [orderDate]: parseDate(transaction[orderDate]).toString(),
        [transactionDate]: parseDate(transaction[transactionDate]).toString(),
        [volume]: `$${Math.ceil((parsedPrice * parsedAmount) * 100) / 100}`,
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
