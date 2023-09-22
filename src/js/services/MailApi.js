import axios from 'axios'

const HTTP = axios.create({
    baseURL: '/api/',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})

export default {
    sendMail(props) {
        return HTTP.post('mail/', props).then((response) => {
            return response.data.object
        })
    },
}
