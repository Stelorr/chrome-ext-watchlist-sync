const KNOWN_EXCHANGES = ['NASDAQ', 'NYSE', 'AMEX', 'ARCA', 'BATS', 'IEX', 'OTC'];

function scrapeWatchlist() {
  const rows = document.querySelectorAll('tr[draggable="true"]');
  const results = [];

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length < 3) return;

    // Ticker symbol lives in the 3rd column, inside a span
    const tickerCell = cells[2];
    const tickerSpan = tickerCell.querySelector('span');
    if (!tickerSpan) return;
    const ticker = tickerSpan.textContent.trim();
    if (!ticker) return;

    // Scan all cells for a known exchange name rather than trusting column position
    let exchange = 'NASDAQ'; // fallback default
    for (const cell of cells) {
      const text = cell.textContent.trim();
      if (KNOWN_EXCHANGES.includes(text)) {
        exchange = text;
        break;
      }
    }

    results.push({ ticker, exchange });
  });

  return results;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapeWatchlist') {
    const data = scrapeWatchlist();
    sendResponse({ tickers: data });
  }
});
