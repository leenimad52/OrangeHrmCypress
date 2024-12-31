import { faker } from '@faker-js/faker'

export default class CommonHelper {

    static generate_random_string(prefix: string = '', maxLength: number = 50) {
        return prefix + faker.string.alpha({ length: maxLength - prefix.length, casing: 'mixed' })
    }

    static generate_random_number(min: number, max: number, prefix: string = '') {
        return prefix + faker.number.int({ min, max })
    }

}