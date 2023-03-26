import {IntVector2} from './UniversalType';
import {quat, vec3} from 'gl-matrix'
export function Lerp(x : number, y : number, t : number) {
    return (1 - t) * x + (t * y);
}

export function NormalizeByRange(target : number, min : number, max : number) {
    return (target - min) / (max - min);
}

export function RandomRange(min : number, max : number) {
    return ~~(Math.random() * (max - min + 1)) + min
};

export function RandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

export function Normalize2D(vector : IntVector2) : IntVector2 {
    let vi = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    let normalized : IntVector2 ={
        x : vector.x / vi,
        y : vector.y / vi
    }

    return normalized;
}

export function VectorNumAdd(vector : IntVector2, scale : number) {
    return {
        x : vector.x + scale,
        y : vector.y + scale
    };
}

export function VectorNumScale(vector : IntVector2, scale : number) {
    return {
        x :vector.x * scale,
        y : vector.y * scale
    };
}

export function VectorDistance(a : IntVector2, b : IntVector2) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

export function VectorMaginitude(a : IntVector2) {
    return Math.sqrt(Math.pow(a.x, 2) + Math.pow( a.y, 2));
}

export function VectorAdd(a : IntVector2, b : IntVector2) {
    return {
        x : a.x + b.x,
        y : a.y + b.y
    }
}

export function VectorMinus(a : IntVector2, b : IntVector2) {
    return {
        x : a.x - b.x,
        y : a.y - b.y
    }
}

export function VectorToArray(v :IntVector2 ) : number[] {
    return [v.x, v.y];
}

export function ArrayToVector(array : number[] ) : IntVector2 {    
    return {x : array[0], y : array[1]};
}

export function Clamp(value : number, min : number, max : number) {
    return Math.min(Math.max(value, min), max);
  };
  

export function GetImagePromise(imagePath : string) {
    return new Promise<HTMLImageElement>( resolve => {
        const im = new Image();
        im.crossOrigin = "anonymous";
        im.src = imagePath;
        im.onload = () => resolve(Object.assign(im));

        return im;
    });
}

export function GetRelativeURL(url : string) {
    return (url.replace(/^(?:\/\/|[^/]+)*\//, ''));
}

export function StringToVector(vectorString : string) : IntVector2 {
    let splits = vectorString.split(",");
    return {
        x : parseFloat(splits[0]),
        y : parseFloat(splits[1])
    };
}

export function RoundToDecimal(value : number, decimal : number) {
    let d = Math.pow(10, decimal);
    return Math.round(value * d) / d;
}

export function RandomChar(N : number) {
    var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    return Array.apply(null, Array(N)).map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
}

export function ToEulerAngles(q : quat) {
    let angles = vec3.create();

    // roll (x-axis rotation)
    let sinr_cosp = 2 * (q[3]* q[0] + q[1] * q[2]);
    let cosr_cosp = 1 - 2 * (q[0] * q[0] + q[1] * q[1]);
    angles[0] = Math.atan2(sinr_cosp, cosr_cosp);

    // pitch (y-axis rotation)
    let sinp = 2 * (q[3] * q[1] - q[2] * q[0]);
    if (Math.abs(sinp) >= 1)
        angles[1] = Math.sign(sinp); // use 90 degrees if out of range
    else
        angles[1] = Math.asin(sinp);

    // yaw (z-axis rotation)
    let siny_cosp = 2 * (q[3] * q[2] + q[0] * q[1]);
    let cosy_cosp = 1 - 2 * (q[1] * q[1] + q[2] * q[2]);
    angles[2] = Math.atan2(siny_cosp, cosy_cosp);

    return angles;
}

export function AABB(objectA_x: number, objectA_y: number, objectA_width: number, objectA_height: number,
                    objectB_x: number, objectB_y: number, objectB_width: number, objectB_height: number
    ) {
        return (objectA_x < objectB_x + objectB_width &&
        objectA_x + objectA_width > objectB_x &&
        objectA_y < objectB_y + objectB_height &&
        objectA_height + objectA_y > objectB_y);
}