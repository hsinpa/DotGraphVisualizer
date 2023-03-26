export interface IntVector2 {
    x : number;
    y : number;
}

export interface StringVector2 {
    x : string;
    y : string;
}

export interface SceneLayoutType {
    gltf : GLTFMarkoutType[];
}

export interface GLTFMarkoutType {
    id: string,
    path : string;
    position : number[]; //Vector3
    orientation : number[]; //Vector3
    scale : number;
    specular : number,
    parent_id : string;
}