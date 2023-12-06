export default class Api{

    token;

    constructor(){
        this.token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWE0NzQ5YmQ4MjQ0Y2I0MmFjNjIxNDNlMTljMDNiOSIsInN1YiI6IjY1MWRmNjBlMDcyMTY2MDBmZjM3ZjQzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CgEBcvgWia2DbrKkBCJYfu_jEdbgQdRkg5ADnNUinmg";
    }

    async consult(url){
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.token}`,
            }
        }
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }

}