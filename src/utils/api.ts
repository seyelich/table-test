import { TProduct } from "../types";
import { baseUrl } from "./constants";

export type TResponse<T> = {
  success: boolean;
} & T;

type TGetProductsReq = {
  products: Array<TProduct>;
  total: number;
  skip: number;
  limit: number;
}

const checkResponse = <T>(res: Response) => {
  return res.ok ? res.json().then(data => data as TResponse<T>) : Promise.reject(res.status);
};

function request<T>(url: string, options?: RequestInit) {
  return fetch(url, options).then(res => checkResponse<T>(res))
}

export const getProducts = () => {
  return request<TGetProductsReq>(baseUrl)
}
