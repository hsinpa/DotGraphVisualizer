import {DataGenerator, DataStruct, GraphStruct, DataAxis} from './data_generator';
import { Container, Application, Graphics, ColorSource, TextStyle, Text } from 'pixi.js';
import { vec2 } from 'gl-matrix';
import { RandomArbitrary, AABB, RandomRange, Clamp } from './utility/UtilityMethod';

const DOTSIZE = 8;
const BLUE = 0x38a4e8;
const RED = 0xde0d4c;
const BLACK = 0x000000;

export class DataVisualizer {
    private m_pixiApplication: Application;
    private m_center : vec2;
    private m_fontStyle: TextStyle;

    constructor(pixiApplication: Application) {
        this.m_pixiApplication = pixiApplication;

        this.m_center = vec2.fromValues(
            this.m_pixiApplication.screen.width * 0.5,
            this.m_pixiApplication.screen.height * 0.5
        );

        this.m_fontStyle = new TextStyle({
            fontSize: 12
        });

        console.log(`Width ${this.m_pixiApplication.screen.width}, Height ${this.m_pixiApplication.screen.height}`);
        console.log(`CenterX ${this.m_center[0]}, CenterY ${this.m_center[1]}`);
    }

    DrawGraph(dataset: DataStruct[]) {
        const container = new Container();
        let containers : GraphStruct[] = [];

        this.m_pixiApplication.stage.addChild(container);
        const graphics = new Graphics();

        container.addChild(graphics);

        let cache_direction = vec2.create();
        for (let i = 0; i < dataset.length; i++) {
            let axis_index = i % 4;
            let axis = DataAxis[axis_index];

            cache_direction[0] = RandomArbitrary(axis.x.min, axis.x.max);
            cache_direction[1] = RandomArbitrary(axis.y.min, axis.y.max);

            vec2.normalize(cache_direction, cache_direction);

            let graphDot = this.DrawData(dataset[i], cache_direction, this.m_center, containers, graphics);
            containers.push(graphDot);

            //Draw Domain Name
            console.log(dataset[i].name);
            let text = this.DrawText(dataset[i].name, graphDot.position[0], graphDot.position[1]);
            container.addChild(text);
        }
    }

    private DrawData(data: DataStruct, direction: vec2, center: vec2, axis_container: GraphStruct[], graphics: Graphics) : GraphStruct {
        let g_struct: GraphStruct = {data: data, position : vec2.create()};

        let trial_count_maxstart = RandomRange(5, 15);
        let trial_bias = Clamp( Math.ceil(trial_count_maxstart - data.size), 0, trial_count_maxstart);

        console.log(`bias ${trial_bias}, size ${data.size}`);
        let trial_count = 1 + trial_bias;
        let collision_pass = false;
        let full_size = DOTSIZE ;
        let radius = data.radius * full_size;

        //Check Collision
        while (!collision_pass) {
            g_struct.position[0] = center[0] + (direction[0] * radius *  trial_count);
            g_struct.position[1] = center[1] + (direction[1] * radius * trial_count);

            if (axis_container.length == 0) collision_pass = true;

            for (let a = 0; a < axis_container.length; a++) {
                let rect_a_offset = g_struct.data.radius * DOTSIZE * 0.5;
                let rect_b_offset = axis_container[a].data.radius * DOTSIZE * 0.5;

                let collision_r = AABB(g_struct.position[0] - rect_a_offset, g_struct.position[1] - rect_a_offset, radius, radius,
                    axis_container[a].position[0] - rect_b_offset, axis_container[a].position[1] - rect_b_offset, 
                    axis_container[a].data.radius * full_size, axis_container[a].data.radius * full_size);

                collision_pass = !collision_r;

                if (collision_r) {
                    break;
                }
            }

            trial_count = trial_count + RandomRange(1, 5);

            if (trial_count > 25) {
                collision_pass = true;
            }

        }

        let rect_offset = (g_struct.data.radius) * DOTSIZE * 0.5;
        // graphics.beginFill(0xa2faba);
        // graphics.drawRect(g_struct.position[0] - rect_offset, g_struct.position[1] - rect_offset, g_struct.data.radius * DOTSIZE, g_struct.data.radius * DOTSIZE );
        // graphics.endFill();

        //Draw IP
        for (let i = 0; i < data.size; i++) {
            g_struct.position[0] - rect_offset, g_struct.position[1]
            let ip_pos_x = g_struct.position[0] + (RandomArbitrary( -data.radius * 0.5, data.radius* 0.5) * full_size);
            let ip_pos_y = g_struct.position[1] + (RandomArbitrary( -data.radius* 0.5, data.radius* 0.5) * full_size);

            this.DrawDot(ip_pos_x, ip_pos_y, RED, DOTSIZE, graphics);
        }
        
        //Draw Domain
        this.DrawDot(g_struct.position[0], g_struct.position[1], BLUE, DOTSIZE, graphics);

        return g_struct;
    }

    private DrawDot(x: number, y : number, color: ColorSource, size: number, graphics: Graphics) {
        //Draw Cen
        graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        graphics.beginFill(color, 1);
        graphics.drawCircle(x, y, size);
        graphics.endFill();
    }

    private DrawText(body: string, x: number, y : number) : Text{
        const basicText = new Text(body, this.m_fontStyle);
        basicText.x = x - (basicText.width * 0.5);
        basicText.y = y -  (basicText.height * 0.5);

        return basicText;
    }


}