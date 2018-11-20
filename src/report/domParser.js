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
  const [hours, minutes] = time.split(':');
  const parsedMinutes = minutes.slice(0, -1);
  const parsedHours = time[time.length - 1] === 'p' ? parseInt(hours, 10) + 12 : parseInt(hours, 10);
  parsedDate.setHours(parsedHours, parsedMinutes);
  return parsedDate;
};

const parseTransactionRow = (node) => {
  const cells = node.querySelectorAll('td');
  // innertext doesn't work here:
  const acc = {};
  cells.forEach((cell, index) => {
    const label = tableLabelMap[index];
    return Object.assign(acc, { [label]: cell.textContent.trim() });
  });

  return acc;
};

const massage = (history, currentNetWorth) => {
  return history.map((transaction) => {
    const orderDate = tableLabelMap[1];
    const transactionDate = tableLabelMap[2];
    const amount = tableLabelMap[4];
    const price = tableLabelMap[5];
    const volume = tableLabelMap[6];
    const parsedPrice = parseFloat(transaction[price].slice(1), 10);
    const parsedAmount = parseInt(transaction[amount].replace(/,/g, ''), 10);

    return Object.assign({}, transaction, {
      [amount]: parseInt(transaction[amount], 10),
      [orderDate]: parseDate(transaction[orderDate]).toString(),
      [transactionDate]: parseDate(transaction[transactionDate]).toString(),
      [volume]: `$${Math.ceil((parsedPrice * parsedAmount) * 100) / 100}`,
    });
  });
};

const parseHistoryFromDom = (document) => {
  const history = []; // reduce doesn't work on nodeLists.
  document.querySelectorAll('.ranking')[0].querySeletor('tbody').querySelectorAll('tr').forEach((node) => {
    const transactionRecord = parseTransactionRow(node);
    history.push(transactionRecord);
  });

  return massage(history);
};

module.exports = parseHistoryFromDom;
