export class Vector3 {
    constructor(x, y, z) {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.z = z ?? 0;
    }

    x = 0;
    y = 0;
    z = 0;

    dotProduct(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    normalized() {
        const len = this.length();
        return new Vector3(this.x / len, this.y / len, this.z / len);
    }
}