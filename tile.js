class Tile {
    
    constructor(id, image, isSolid) {
        this.id = id;
        this.image = image;
        this.isSolid = isSolid;
        this.width = this.image.width;
        this.height = this.image.height;
    }

    render(context, x, y) {
        context.drawImage(this.image, 0, 0, this.width, this.height, x, y, this.width, this.height);
    }

}