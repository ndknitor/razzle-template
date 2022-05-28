import { validate, ValidationError } from "class-validator";

export default class ViewModel {
    protected message: ValidationError[];
    getMessage = (key: string) => {
        if (!this.message) {
            return ''
        }
        const messageObj = this.message.find(o => o.property == key);
        if (messageObj && messageObj.constraints) {
            const messageKeys = Object.values(Object.keys(messageObj.constraints));
            if (messageKeys.length > 0) {
                return messageObj.constraints[messageKeys[0]];
            }
        }
        return '';
    }
    check = async () => {
        this.message = await validate(this);
        return this.message.length == 0;
    }
}
