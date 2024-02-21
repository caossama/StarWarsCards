const divRain = document.querySelector('.rain');

const rain = () => {
  let j = 0;
  while (j <= 80) {
    let gout = document.createElement('drop');
    let x = innerWidth * Math.random();
    let time = 15 * Math.random();
    let height = Math.floor(Math.random() * 10) + 5;

    gout.style.animationDuration = time + 's';
    gout.style.left = x + 'px';
    gout.style.height = height + 'px';
    gout.style.opacity = Math.random();

    divRain.appendChild(gout);
    j++;
  }
}

rain();