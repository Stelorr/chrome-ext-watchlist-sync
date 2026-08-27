# Watchlist Sync (Chrome Extension)

A Chrome extension that captures your Webull watchlist and lets you jump straight to each ticker's TradingView chart with one click — no manual retyping of symbols across platforms.

## The Problem

A lot of traders execute orders on one platform (Webull) but chart on another (TradingView), since TradingView's charting tools are generally stronger. That means manually re-typing the same tickers into TradingView every time your watchlist changes. This extension eliminates that.

## How It Works

1. Open your watchlist at `app.webull.com/watch`
2. Click the extension icon → **Capture from Webull**
3. A content script scrapes the visible ticker symbols and exchange (NASDAQ, NYSE, etc.) directly from the page's table rows
4. Click any captured ticker (or its **Chart** button) to open that symbol's TradingView chart in a new tab — `tradingview.com/chart/?symbol=EXCHANGE:TICKER`

The captured list persists via `chrome.storage.local`, so it's still there next time you open the popup.

## Why Not Use TradingView's Native "Upload List" Import?

TradingView does support importing a `.txt` watchlist file, and this extension originally targeted that flow. In testing, it turned out **watchlist import/multiple watchlists are gated behind TradingView's paid tiers** — free-tier and free-trial users can't use it. Rather than build a feature most users couldn't actually use, the extension pivoted to direct chart navigation instead, which requires zero TradingView account privileges and is arguably a faster workflow anyway (one click vs. downloading a file and manually uploading it).

## Tech Stack

- Vanilla JavaScript, HTML, CSS — no build step
- Chrome Manifest V3
- `chrome.storage.local` for persistence
- A content script scoped to `app.webull.com` for DOM scraping

**Note on tooling:** this project originally used Vite + CRXJS for bundling for hot-reload during development. That toolchain caused a series of dead-end bugs (broken native bindings, dev-mode WebSocket failures, silently broken popup loading) that ended up costing more time than they saved for a project this size. It was dropped in favor of plain, dependency-free files — simpler, more transparent, and more reliable for an extension this size.


## Status

 Core capture + chart-navigation flow working end to end.

## Future Ideas (not yet built)

- **Multi-broker support** — Schwab, Fidelity, Robinhood, IBKR each have their own watchlist DOM structure and would need their own content script, following the same pattern proven here for Webull.
- **Multi-destination charting** — same "click to open" pattern could target StockCharts, Finviz, or Yahoo Finance instead of (or in addition to) TradingView.
- **Scheduled auto-refresh** — periodically re-capture the watchlist in the background instead of requiring a manual click each time.
- **Watchlist-tab awareness** — currently captures whatever watchlist tab (e.g. "My Positions," a custom list) happens to be visible on Webull; could add the ability to target a specific named list from within the popup.

## License / Usage

This repository is public for portfolio purposes. The code is not licensed for reuse, redistribution, or commercial use. All rights reserved.

If you're interested in using or licensing this tool, please reach out.
