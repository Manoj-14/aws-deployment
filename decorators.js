const logClass = (target) => {
    console.log(target.name);
}

@logClass
class some {
    constructor(para) {
        this.para = para;
    }
}

const someObj = new some("Manoj");