"use strict"
import './styles/style.css';
import { Pages } from './modules/pages.js';
import { RoyalCoinsMachine } from './modules/royalCoins.js';

const pages = new Pages();
pages.switcher();

document.addEventListener('DOMContentLoaded', () => {
  const royalCoins = new RoyalCoinsMachine();
  royalCoins.activeRoyalCoins();
});
