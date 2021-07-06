

export class Image {
    constructor(
        private id: string,
        private subtitle: string,
        private author: string,
        private date: Date | string,
        private file: string,
        private tags: string,
        private collection: string
    ) {}

    getId() {
        return this.id;
    }
    getSubtitle() {
        return this.subtitle;
    }

    getAuthor() {
        return this.author;
    }

    getDate() {
        return this.date;
    }

    getFile() {
        return this.file;
    }

    getTags() {
        return this.tags;
    }

    getCollection() {
        return this.collection;
    }

    setId(id: string) {
        this.id = id;
    }
    setSubtitle(subtitle: string) {
        this.subtitle = subtitle;
    }

    setAuthor(author: string) {
        this.author = author;
    }

    setDate(newDate: string){
        this.date = newDate
    }

    setFile(file: string) {
        this.file = file;
    }

    setTags(tags: string) {
        this.tags = tags;
    }

    setCollection(collection: string) {
        this.collection = collection;
    }
}

export interface ImageInputDTO {
    subtitle: string,
    file: string,
    tags: string,
    collection: string
}
