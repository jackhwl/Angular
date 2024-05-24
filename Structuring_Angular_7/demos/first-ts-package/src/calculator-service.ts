export namespace CalculatorService {
    export function add(...numbers: number[]): number {
        let sum = 0
        numbers.forEach(number => (sum += number))
        return sum
    }
}