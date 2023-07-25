"use strict"
import './styles/style.css';
import { Pages } from './modules/pages.js';

const pages = new Pages();
pages.switcher();

const wheels = document.querySelectorAll('.game-drum-wheel');

let turn = 10;
// setInterval(() => {
//   turn -= 1;
//   wheels[0].style.transform = `translateY(${turn}px)`;
// }, 0.5)
