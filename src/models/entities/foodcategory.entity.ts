import { type Extra } from '../db.types/extra.type'

export class FoodCategoryEntity {
  constructor (
    public name: string,
    public dressing: string[] | null,
    public extras: Extra[] | null
  ) {}
}
