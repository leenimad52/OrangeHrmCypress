import { faker } from '@faker-js/faker'

export default class CommonHelper {

    static generate_random_string(prefix: string = '', maxLength: number = 50) {
        return prefix + faker.string.alpha({ length: maxLength - prefix.length, casing: 'mixed' })
    }

    static generate_random_number(min: number = 0, max: number = 1000) {
        return faker.number.int({ min, max })
    }

}