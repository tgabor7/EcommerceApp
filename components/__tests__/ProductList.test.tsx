import { Product } from "../ProductItem";
import { namesort, pricesort } from "../ProductList";

const products: Product[] = [
    { name: 'a', description: '', price: 100, available: true, rating: 1, key: 0 },
    { name: 'd', description: '', price: 200, available: true, rating: 1, key: 0 },
    { name: 'c', description: '', price: 0, available: true, rating: 1, key: 0 },
    { name: 'z', description: '', price: 234, available: true, rating: 1, key: 0 },
    { name: '0', description: '', price: 9999999, available: true, rating: 1, key: 0 },
    { name: 'A', description: '', price: 0, available: true, rating: 1, key: 0 },
    { name: 'U', description: '', price: 12, available: true, rating: 1, key: 0 },
    { name: 'x', description: '', price: 345, available: true, rating: 1, key: 0 },
    { name: '4', description: '', price: 678, available: true, rating: 1, key: 0 },
]

describe("Sort tests", () => {
    test("Sort by name", () => {
        expect(products.sort(namesort)).toStrictEqual([
            { name: '0', description: '', price: 9999999, available: true, rating: 1, key: 0 },
            { name: '4', description: '', price: 678, available: true, rating: 1, key: 0 },
            { name: 'A', description: '', price: 0, available: true, rating: 1, key: 0 },
            { name: 'a', description: '', price: 100, available: true, rating: 1, key: 0 },
            { name: 'c', description: '', price: 0, available: true, rating: 1, key: 0 },
            { name: 'd', description: '', price: 200, available: true, rating: 1, key: 0 },
            { name: 'U', description: '', price: 12, available: true, rating: 1, key: 0 },
            { name: 'x', description: '', price: 345, available: true, rating: 1, key: 0 },
            { name: 'z', description: '', price: 234, available: true, rating: 1, key: 0 },
        ])
    })
    test("Sort by price", ()=>{
        expect(products.sort(pricesort)).toStrictEqual([
            { name: 'c', description: '', price: 0, available: true, rating: 1, key: 0 },
            { name: 'A', description: '', price: 0, available: true, rating: 1, key: 0 },
            { name: 'U', description: '', price: 12, available: true, rating: 1, key: 0 },
            { name: 'a', description: '', price: 100, available: true, rating: 1, key: 0 },
            { name: 'd', description: '', price: 200, available: true, rating: 1, key: 0 },
            { name: 'z', description: '', price: 234, available: true, rating: 1, key: 0 },
            { name: 'x', description: '', price: 345, available: true, rating: 1, key: 0 },
            { name: '4', description: '', price: 678, available: true, rating: 1, key: 0 },
            { name: '0', description: '', price: 9999999, available: true, rating: 1, key: 0 },
        ])
    })
})