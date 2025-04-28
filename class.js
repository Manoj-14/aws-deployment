class PrivateMethosExample {
    #foo = "private";
    constructor(text) {
        this.#foo = text;
    }
    getFoo = () => {
        return { "Name": this.#foo, "length": this.#getFooLength() };
    }
    #getFooLength = () => {
        return this.#foo.length;
    }
}

const privateAccessMethod = new PrivateMethosExample("Manoj");
console.log(privateAccessMethod.getFoo());
