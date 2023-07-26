export class RoyalCoinsMachine {
  constructor() {
    this.drum = document.querySelector('.game-drum');
    this.wheels = document.querySelectorAll('.game-drum-wheel');
    this.autoBtn = document.querySelector('.auto-royal-coins');
    this.spinBtn = document.querySelector('.spin-royal-coins');

    this.chanceRange = 9; // Диапазон генератора рандома 19 - 99

    this.balance = localStorage.getItem('balance') ? Number(localStorage.getItem('balance')) : 1000000;
    this.starsHave = localStorage.getItem('starsHave') ? Number(localStorage.getItem('starsHave')) : 0;
    this.starsMax = localStorage.getItem('starsMax') ? Number(localStorage.getItem('starsMax')) : 9000;

    this.bet = 1000;
    this.prize = 0;

    this.coinsField = document.querySelectorAll('.coins-field');
    this.starsHaveField = document.querySelectorAll('.stars-have');
    this.starsMaxField = document.querySelectorAll('.stars-max');
    this.betField = document.querySelector('.royal-coins-bet-count-field');
    this.prizeField = document.querySelector('.royal-coins-prize-field');

    this.minusBtn = document.querySelector('.royal-coins-minus-btn');
    this.plusBtn = document.querySelector('.royal-coins-plus-btn');
  }

  wheelTurner(show, scroll, wheel, drumItems, tick) {
    let position = 0;
    //Сколько будет показывать элеменов
    const slidesToShow = show;
    //Сколько будет скролить
    const slidesToScroll = scroll;
    const drumContainer = this.drum; // используем, если ориентируемся на высоту контейнера
    const itemContainer = document.querySelector('.wheel-img-container');
    // Лист с элементами
    const track = document.querySelector(`.${wheel}`);

    // Количество элементов
    const items = document.querySelectorAll(`.${drumItems}`);
    const itemsCount = items.length;

    // Получаем ширину каждого элемента
    const itemHeight = drumContainer.clientHeight / slidesToShow; // используем, если ориентируемся на высоту контейнера
    // const itemHeight = itemContainer.clientHeight;
    const movePosition = slidesToScroll * itemHeight;

    items.forEach((item) => {
      item.style.minHeight = `${itemHeight}px`;
    });

    const processTick = () => {
      console.log(`drum ${wheel.slice(-1)} tick`);
      const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemHeight) / itemHeight;
      const containerInner = document.querySelector(`.${wheel}`);
      const itemsInner = document.querySelectorAll(`.${drumItems}`);
      const forReplacing = itemsInner[0];
      containerInner.appendChild(forReplacing);

      position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemHeight;
      setPosition();

      tick--;
      if (tick > 0) {
        setTimeout(processTick, 100);
      }
    };

    setTimeout(processTick, 100);

    setTimeout(() => {
      track.style.transition = '0s';
      track.style.transform = `translateY(0px)`;
    }, 100); // сброс анимаций при старте

    const setPosition = () => {
      track.style.transform = `translateY(${position}px)`;
      track.style.transition = '.5s';

    }
    return tick;
  }


  async gameLogic() {
    const randomNumber = () => Math.floor(Math.random() * (this.chanceRange - 9 + 1)) + 9;

    const turns1 = this.wheelTurner(3, 1, 'royal-coins-wheel-1', 'drum1-rc-item', randomNumber());
    const turns2 = this.wheelTurner(3, 1, 'royal-coins-wheel-2', 'drum2-rc-item', randomNumber());
    const turns3 = this.wheelTurner(3, 1, 'royal-coins-wheel-3', 'drum3-rc-item', randomNumber());

    const totalTime = Math.max(...[turns1, turns2, turns3]) + 10;

    let winCombo = null;

    // Создаем промис, который выполнится после истечения таймера
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('game stopped');
        const drum1 = document.querySelectorAll('.drum1-rc-item')[8];
        const drum2 = document.querySelectorAll('.drum2-rc-item')[8];
        const drum3 = document.querySelectorAll('.drum3-rc-item')[8];

        const centralValue1 = drum1.children[0].classList[0];
        const centralValue2 = drum2.children[0].classList[0];
        const centralValue3 = drum3.children[0].classList[0];

        winCombo = centralValue1 === centralValue2 && centralValue2 === centralValue3;
        resolve(winCombo); // Возвращаем winCombo через resolve
      }, totalTime * 100);
    });

    // Ждем, когда промис выполнится (после истечения таймера)
    const result = await promise;
    console.log(this.bet);
    return result; // Возвращаем winCombo
  }


  activeRoyalCoins() {
    // Читаем локальное хранилище
    this.coinsField.forEach(el => el.innerHTML = this.balance);
    this.starsHaveField.forEach(el => el.innerHTML = this.starsHave);
    this.starsMaxField.forEach(el => el.innerHTML = this.starsMax);

    this.spinBtn.addEventListener('click', async () => {
      await this.gameLogic()
        .then((win) => {
          if (win) {
            this.prizeField.innerHTML = this.bet;

            this.balance += this.bet;
            this.coinsField.forEach(el => el.innerHTML = this.balance);
            this.starsHave += 100;
            this.starsHaveField.forEach((el) => el.innerHTML = this.starsHave);

            localStorage.setItem('starsHave', this.starsHave);

            if (this.starsHave > 9000) {
              this.starsHave = 9000;
              this.starsHaveField.forEach((el) => el.innerHTML = this.starsHave);

              localStorage.setItem('starsHave', this.starsHave);
            }

            localStorage.setItem('balance', this.balance);
            console.log('you win');
          } else {
            this.prizeField.innerHTML = 0;

            this.balance -= this.bet;
            this.coinsField.forEach(el => el.innerHTML = this.balance);

            localStorage.setItem('balance', this.balance);
            console.log('you lose');

            if (this.balance <= 0) {
              this.balance = 0;
              this.coinsField.forEach(el => el.innerHTML = this.balance);

              localStorage.setItem('balance', this.balance);
              console.log('total lose');
            }
          }
        });

    });

    this.minusBtn.addEventListener('click', () => {
      this.bet -= 1000;
      if (this.bet < 1000) {
        this.bet = 1000;
      }
      this.betField.innerHTML = this.bet;
    });

    this.plusBtn.addEventListener('click', () => {
      this.bet += 1000;
      if (this.bet > 90000) {
        this.bet = 90000;
      }
      this.betField.innerHTML = this.bet;
    });

    this.autoBtn.addEventListener('click', () => {

    });
  }
}