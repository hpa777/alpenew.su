import axios from "axios";

const HTTP = axios.create({
    baseURL: '/api/',    
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}    
})

export default {    
    getResource(id, invludeTvs) {
        return HTTP.get('resources/' + id, {
            params: {
                tvs: invludeTvs
            }
        }).then((response) => {
            return response.data;
        })
    },
    getSliderData(sliderType) {
        return HTTP.get('resources/', {
            params: {
                slider: sliderType
            }
        }).then((response) => {
            return response.data.results;
        })
    }
}