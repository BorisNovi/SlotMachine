export class Pages {
  constructor() {
    this.mainPage = document.querySelector('.main');
    this.acceptBtn = document.querySelector('.privacy-accept-btn');
    this.lobbyPage = document.querySelector('.lobby');
    this.lobbyGames = document.querySelector('.lobby-games');
    this.royalCoinsPage = document.querySelector('.royal-coins');
    this.wildCashPage = document.querySelector('.wild-cash');
    this.backBtns = document.querySelectorAll('.back-btn');
  }

  mainToLobby(){
    this.lobbyPage.removeAttribute('hidden');

    this.mainPage.setAttribute('hidden', 'true');
    this.royalCoinsPage.setAttribute('hidden', 'true');
    this.wildCashPage.setAttribute('hidden', 'true');

    localStorage.setItem('pageState', 1);
  }

  lobbyToGame(game) {
    this.mainPage.setAttribute('hidden', 'true');
    this.lobbyPage.setAttribute('hidden', 'true');

    switch (game) {
      case 1: {
        this.royalCoinsPage.removeAttribute('hidden');
        this.wildCashPage.setAttribute('hidden', 'true');

        localStorage.setItem('gameState', game);
        break;
      }
      case 2: {
        this.royalCoinsPage.setAttribute('hidden', 'true');
        this.wildCashPage.removeAttribute('hidden');

        localStorage.setItem('gameState', game);
        break;
      } // if more games add more cases
    }
  }

  backToLobby() {
    this.lobbyPage.removeAttribute('hidden');

    this.mainPage.setAttribute('hidden', 'true');
    this.royalCoinsPage.setAttribute('hidden', 'true');
    this.wildCashPage.setAttribute('hidden', 'true');

    localStorage.removeItem('gameState');
  }

  switcher() {
    document.addEventListener('DOMContentLoaded', () => {
      Number(localStorage.pageState) === 1 ? this.mainToLobby() : null;
      Number(localStorage.gameState) === 1 ? this.lobbyToGame(Number(localStorage.gameState)) :
      Number(localStorage.gameState) === 2 ? this.lobbyToGame(Number(localStorage.gameState)) :
      null; // if more games add more cases
    });

    this.acceptBtn.addEventListener('click', () => {
      this.mainToLobby();
    });

    this.backBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.backToLobby();
      });
    });

    this.lobbyGames.addEventListener('click', (event) => {
      const gameIcon = event.target.parentElement;
      if (gameIcon.classList[2] === 'avaliable') {
        switch (gameIcon.classList[1]) {
          case 'game1': {
            this.lobbyToGame(1);
            console.log('game 1');
            break;
          }
          case 'game2': {
            this.lobbyToGame(2);
            console.log('game 2');
            break;
          }
          case 'game3': {
            console.log('game 3');
            break;
          } // no game - locked
          case 'game4': {
            console.log('game 4');
            break;
          }; // no game - locked
          case 'game5': {
            console.log('game 5');
            break;
          }; // no game - locked
        }
      }
    });
  }
}