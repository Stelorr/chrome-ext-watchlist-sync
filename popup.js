const captureBtn = document.getElementById('captureBtn');
const statusEl = document.getElementById('status');
const tickerListEl = document.getElementById('tickerList');

let currentTickers = []; // array of { ticker, exchange }

chrome.storage.local.get(['watchlist'], (result) => {
  if (result.watchlist && result.watchlist.length > 0) {
    currentTickers = result.watchlist;
    renderTickers();
    statusEl.textContent = `${currentTickers.length} tickers loaded from last capture.`;
  }
});

captureBtn.addEventListener('click', async () => {
  statusEl.textContent = 'Capturing...';
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url || !tab.url.includes('webull.com')) {
    statusEl.textContent = 'Open your Webull watchlist page first.';
    return;
  }

  chrome.tabs.sendMessage(tab.id, { action: 'scrapeWatchlist' }, (response) => {
    if (chrome.runtime.lastError) {
      statusEl.textContent = 'Could not connect. Refresh the Webull tab and try again.';
      return;
    }
    if (response && response.tickers && response.tickers.length > 0) {
      currentTickers = response.tickers;
      chrome.storage.local.set({ watchlist: currentTickers });
      renderTickers();
      statusEl.textContent = `Captured ${currentTickers.length} tickers. Click any ticker to open its chart.`;
    } else {
      statusEl.textContent = 'No tickers found on this page.';
    }
  });
});

function renderTickers() {
  tickerListEl.innerHTML = '';
  currentTickers.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'ticker-row';

    const label = document.createElement('span');
    label.className = 'ticker-label';
    label.textContent = `${item.exchange}:${item.ticker}`;

    const actions = document.createElement('div');
    actions.className = 'ticker-actions';

    const chartBtn = document.createElement('button');
    chartBtn.className = 'chart-btn';
    chartBtn.textContent = 'Chart';
    chartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openChart(item);
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentTickers.splice(i, 1);
      chrome.storage.local.set({ watchlist: currentTickers });
      renderTickers();
    });

    actions.appendChild(chartBtn);
    actions.appendChild(removeBtn);

    row.appendChild(label);
    row.appendChild(actions);

    // Clicking anywhere on the row (not just the Chart button) opens the chart
    row.addEventListener('click', () => openChart(item));

    tickerListEl.appendChild(row);
  });
}

function openChart(item) {
  const url = `https://www.tradingview.com/chart/?symbol=${item.exchange}:${item.ticker}`;
  chrome.tabs.create({ url });
}
