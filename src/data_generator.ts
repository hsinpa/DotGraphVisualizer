import {RandomRange, Clamp} from './utility/UtilityMethod';
import {vec2} from 'gl-matrix';

export class DataGenerator {

    static generate_fake_data(large_data: number, medium_data: number, small_data: number) {
        let dataset : DataStruct[]  = [];

        for (let i = 0; i < large_data; i++) {
            dataset.push(RandomDataStruct(dataset.length, 15, 20));
        }

        for (let i = 0; i < medium_data; i++) {
            dataset.push(RandomDataStruct(dataset.length, 5, 10));
        }

        for (let i = 0; i < small_data; i++) {
            dataset.push(RandomDataStruct(dataset.length, 0, 3));
        }

        return dataset;
    }
}

function RandomDataStruct(index: number, min: number, max: number) : DataStruct{
    let size = RandomRange(min, max);
    let radius = Math.ceil(size / 4);
    radius = Clamp(radius, 1, max) * 2;

    return {name : "data_"+index, size: RandomRange(min, max), radius: radius };
}

export interface DataStruct {
    name : string,
    size: number,
    radius: number,
}

export interface GraphStruct {
    data: DataStruct,
    position: vec2,
}

export let DataAxis = [
    { x : { max: 1, min: 0 },  y : { max: 1, min: 0 }}, // North East
    { x : { max: 0, min: -1 },  y : { max: 1, min: 0 }}, // North West
    { x : { max: 0, min: -1 },  y : { max: 0, min: -1 }}, // South West
    { x : { max: 1, min: 0 },  y : { max: 0, min: -1 }} // South East
];