export class RoyalCoinsMachine {
  constructor() {
    this.drum = document.querySelector('.game-drum');
    this.wheels = document.querySelectorAll('.game-drum-wheel');
  }

  wheelTurner (show = 3, scroll = 1, wheel = 'royal-coins-wheel-1', drumItems = 'drum1-rc-item') {
    let position = 0;
    //Сколько будет показывать элеменов
    const slidesToShow = show;
    //Сколько будет скролить
    const slidesToScroll = scroll;
    const drumContainer = this.drum; // используем, если ориентируемся на высоту контейнера
    const itemContainer = document.querySelector('.wheel-img-container');
    // лист с айтемами
    const track = this.wheels[0];
    const btnNext = document.querySelector(".spin-royal-coins");

    //Количество элементов
    const items = document.querySelectorAll(`.${drumItems}`);
    const itemsCount = items.length;

    //Получаем ширину каждого элемента
    const itemHeight = drumContainer.clientHeight / this.slidesToShow; // используем, если ориентируемся на высоту контейнера
    // const itemHeight = itemContainer.clientHeight;
    const movePosition = slidesToScroll * itemHeight;

    items.forEach((item) => {
      item.style.minHeight = `${itemHeight}px`;
    });

    btnNext.addEventListener('click', () => {
      console.log('spin pushed');
      const itemsLeft = itemsCount - (Math.abs(position) + this.slidesToShow * itemHeight) / itemHeight;
      const containerInner = document.querySelector(`.${wheel}`);
      const itemsInner = document.querySelectorAll(`.${drumItems}`);
      const forReplacing = itemsInner[0];
      containerInner.appendChild(forReplacing);
      console.log(containerInner);
      position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemHeight;;
      setPosition();
      /*  checkButtons() */
    });

    const setPosition = () => {
      track.style.transform = `translateY(${position}px)`;
    }
  }
  activeRoyalCoins() {
    console.log('activated', this.wheels);
    this.wheelTurner(3, 1, 'royal-coins-wheel-1', 'drum1-rc-item');
    this.wheelTurner(3, 1, 'royal-coins-wheel-2', 'drum2-rc-item');
    this.wheelTurner(3, 1, 'royal-coins-wheel-3', 'drum3-rc-item');
  }
}