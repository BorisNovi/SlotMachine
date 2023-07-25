export class Pages {
  constructor() {
    this.mainPage = document.querySelector('.main');
    this.acceptBtn = document.querySelector('.privacy-accept-btn');

    this.lobbyPage = document.querySelector('.lobby');
    this.gamesList = document.querySelector('.game-icon');
//TODO: add page switching
    this.royalCoinsPage = document.querySelector('.royal-coins');

    this.wildCashPage = document.querySelector('.wild-cash');
  }

  switcher() {
    console.log('switcher activated', this.mainPage);
  }
}