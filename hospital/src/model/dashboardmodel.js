import axios from 'axios'; 
const dashboardmodel = class{
    constructor(){
        this.baseUrl="http://localhost:5001/emp"
        console.log(this.baseUrl)
    }
    async list(){
        return await axios.get(this.baseUrl)
    }
}

export default new dashboardmodel();