import { Container, Sprite } from 'pixi.js';

export function addCar(app, car)
{
    const carContainer = new Container();

    app.stage.addChild(carContainer);
}

export function animateCars(app, cars, time)
{
    const carCount = 2;
    const carAssets = ['car1', 'car2'];
}
// Функция для рисования пути
function drawPath(car, path) {
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(2, car.tint);
    graphics.moveTo(path[0].x, path[0].y);
    for (let i = 1; path.length; i++) {
    graphics.lineTo(path[i].x, path[i].y);
    }
    gameContainer.addChild(graphics);
    return graphics;
    }
    
    // Функция для проверки столкновения машин
    function checkCollision(car1, car2) {
    const bounds1 = car1.getBounds();
    const bounds2 = car2.getBounds();
    return bounds1.x + bounds1.width > bounds2.x &&
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.y + bounds1.height > bounds2.y &&
    bounds1.y < bounds2.y + bounds2.height;
    }
    
    // Обработчик события нажатия на машинку
    function handleCarClick(event) {
    const car = event.target;
    const path = [];
    const graphics = drawPath(car, path);
    car.interactive = false;
    
    // Обработчик события движения мыши
    function handleMouseMove(event) {
    const point = event.data.global;
    path.push(point);
    graphics.clear();
    graphics.lineStyle(2, car.tint);
    graphics.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
    graphics.lineTo(path[i].x, path[i].y);
    }
    }
    
    // Обработчик события отпускания мыши
    function handleMouseUp(event) {
    const point = event.data.global;
    path.push(point);
    graphics.clear();
    graphics.lineStyle(2, car.tint);
    graphics.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
    graphics.lineTo(path[i].x, path[i].y);
    }
    
    // Проверка, находится ли конец пути на парковочном месте
    const parkingPlace = parkingPlaces.find((place) => {
      return place.contains(point.x, point.y);
    });
    
    if (parkingPlace) {
      // Если путь заканчивается на парковочном месте, то оставляем его на экране
      graphics.interactive = false;
    } else {
      // Если путь не заканчивается на парковочном месте, то удаляем его
      graphics.destroy();
    }
    
    // Проверка, нарисованы ли пути для обеих машин
    if (cars.every((car) => !car.interactive)) {
      // Если пути нарисованы, то запускаем анимацию столкновения машин
      animateCollision();
    }
    }
    
    // Добавление обработчиков событий
    app.stage.on('mousemove', handleMouseMove);
    app.stage.on('mouseup', handleMouseUp);
    }
    
    // Функция для анимации столкновения машин
    function animateCollision() {
    const failImage = new PIXI.Sprite.from('fail.png');
    failImage.x = app.screen.width / 2;
    failImage.y = app.screen.height / 2;
    failImage.anchor.set(0.5);
    failImage.alpha = 0;
    gameContainer.addChild(failImage);
    
    // Анимация появления картинки "Fail"
    const fadeIn = new TWEEN.Tween(failImage)
    .to({ alpha: 1 }, 1000)
    .onComplete(() => {
    setTimeout(() => {
    gameContainer.removeChild(failImage);
    showFinalScene();
    }, 2000); // Ждем некоторое время перед переходом к финальной сцене
    })
    .start();
    }
    
    // Функция для отображения финальной сцены
    function showFinalScene() {
    // Добавление затемнения на фон
    const blackout = new PIXI.Graphics();
    blackout.beginFill(0x000000, 0.7); // Затемнение из прозрачности до цвета
    blackout.drawRect(0, 0, app.screen.width, app.screen.height);
    
    // Добавление логотипа и кнопки "Play now"
    
    }