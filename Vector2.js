export class Vector2 {
    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }

    dotProduct(v) {
        return this.x * v.x + this.y * v.y;
    }
    
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalized()  {
        const len = this.length();
        return len == 0 ? new Vector2() : new Vector2(this.x / len, this.y / len);
    }

    scaled(scale) {
        return new Vector2(this.x * scale, this.y * scale);
    }

    copy() {
        return new Vector2(this.x, this.y);
    }
}