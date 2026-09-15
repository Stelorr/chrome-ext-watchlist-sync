# Watchlist Sync — Privacy Policy

*Last updated September 2026*

**TL;DR: nothing you do in this extension ever leaves your browser.**

## What this extension does

Watchlist Sync reads the ticker symbols and exchange names visible on your Webull watchlist page (`app.webull.com`) when you click "Capture from Webull," and lets you open a matching TradingView chart in a new tab with one click.

## Data collection

Watchlist Sync does not collect, transmit, sell, or share any data. Specifically:

- No analytics, tracking, or telemetry of any kind.
- No data is sent to any server operated by the developer or any third party.
- The only network activity the extension initiates is opening a new browser tab to `tradingview.com` when you click a captured ticker — a normal page navigation, not a data transfer.

## What's stored, and where

The captured ticker list (symbol + exchange only — never your account balance, positions, orders, or any personally identifying information) is saved using Chrome's built-in `chrome.storage.local` API. This data stays on your device, inside your own browser profile, and is never synced to a remote server by this extension.

## Permissions explained

- **Host access to app.webull.com** — required so the extension's content script can read the ticker symbols shown on your watchlist page. It cannot read or act on any other website.
- **storage** — used only to save your captured list locally, so it's still there next time you open the popup.
- **activeTab / scripting** — used only to run the capture action on the Webull tab you're currently viewing, when you click the extension's button.

## Changes to this policy

If this extension's data practices ever change, this page will be updated accordingly.

## Contact

Questions about this extension or its privacy practices can be directed via the [GitHub repository](https://github.com/Stelorr/chrome-ext-watchlist-sync).
