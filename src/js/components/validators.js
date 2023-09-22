import moment from "moment/moment";

export const VALID_PHONE = (phone) => /^\+7\([3489]{1}[0-9]{2}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(phone);

export const VALID_NAME = (name) => /^[а-яёА-ЯЁ\s\.]{3,}$/u.test(name);

export const VALID_NUMBER = (num) => /^\d+$/.test(num) && num > 0

export const VALID_DATE = (input, mode = 0) => {
    //mode 1 - Совершеннолетние
    //mode 2 - Предстоящая дата
    //mode 3 - предыдущая дата
    if (/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/.test(input) === false) {
        return false;
    } else if (mode === 1) {
        let date = moment(input, "DD.MM.YYYY");
        let now = moment();                
        if (now.diff(date, 'year') < 18) {
            return false;
        }
    } else if (mode === 2) {
        let date = moment(input, "DD.MM.YYYY");
        let now = moment().startOf('day');;
        if (now.isAfter(date)) {
            return false;
        }
    } else if (mode === 3) {
        let date = moment(input, "DD.MM.YYYY");
        let now = moment().startOf('day');;
        if (now.isBefore(date)) {
            return false;
        }
    }
    return true;
}

export const VALID_EMAIL = (email) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);