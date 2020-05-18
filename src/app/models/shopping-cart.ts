import { Item } from './item';

export interface ShoppingCart {
    id: string,
    dateCreated: number,
    items: Item[]
}