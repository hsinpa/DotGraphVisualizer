import './stylesheet/style.scss';
import { Application } from 'pixi.js';
import {DataVisualizer} from './data_visualizer';
import {DataGenerator} from './data_generator';

window.addEventListener("load", function(event) {

    let app = new Application({ width: 640, height: 460, background: '#c2bebf' });
    let pixi_dom = this.document.querySelector("#pixi_dom");

    if (pixi_dom != null) {
        pixi_dom.appendChild<any>(app.view);
        
        let randomData = DataGenerator.generate_fake_data(3, 8, 8);
        let visualizer = new DataVisualizer(app);
        visualizer.DrawGraph(randomData);
    }
});