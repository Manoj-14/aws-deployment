const data = require("./ami-id.json")


module.exports = {
    getAmiId: (name) => {
        return data.find(ami => ami.name === name).id;
    }
}