import { Application, Assets } from 'pixi.mjs';
import { addCar, animateCars } from './addCar';
const app = new Application();

const car = [];

(async () =>
    {
        await setup();
        await preload();
    })();

    async function setup()
{
    await app.init({ background: '#545454', resizeTo: window });
    document.body.appendChild(app.canvas);
}

async function preload()
{
    const assets = [
        { alias: 'background', src: 'parcking.png' },
        { alias: 'point', src: 'point.png' },
        { alias: 'car1', src: 'redcar.png' },
        { alias: 'car2', src: 'yellowcar.png' },
     
    ];
    await Assets.load(assets);
}
(async () =>
    {
        await setup();
        await preload();
    
        addBackground(app);
        addCar(app, car);
    

        app.ticker.add((time) => animateCars(app, car, time));
    })();