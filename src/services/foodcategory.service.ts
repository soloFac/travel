import { FoodCategoryDto } from '../models/dtos';

const API_URL = import.meta.env.VITE_REACT_API_URL

export class CategoryService {
  static async getCategoryByName ( localId: string, nameCategory: string ) {
    const response = await fetch( `${ API_URL }/category?localId=${ localId }&nameCategory=${ nameCategory }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    } );
    const data = await response.json();
    return data;
  }

  static async createCategory ( localId: string, category: FoodCategoryDto ) {
    const response = await fetch( `${ API_URL }/category?localId=${ localId }`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( category )
    } );
    const data = await response.json();
    return data;
  }

  static async updateCategory ( localId: string, category: FoodCategoryDto ) {
    const response = await fetch( `${ API_URL }/category?localId=${ localId }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( category )
    } );
    const data = await response.json();
    return data;
  }

  static async deleteCategory ( localId: string, nameCategory: string ) {
    const response = await fetch( `${ API_URL }/category?localId=${ localId }&nameCategory=${ nameCategory }`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    } );
    const data = await response.json();
    return data;
  }
}
