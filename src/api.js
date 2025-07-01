// src/api.js
import axios from 'axios';
import { USE_MYSQL_API, MYSQL_API, JSON_API } from './config';

const getBaseURL = () => (USE_MYSQL_API ? MYSQL_API : JSON_API);

// Products
export const fetchProducts = () => axios.get(`${getBaseURL()}/products${USE_MYSQL_API ? '' : '?_expand=supplier'}`);
export const fetchSuppliers = () => axios.get(`${getBaseURL()}/suppliers`);
export const createProduct = (data) => axios.post(`${getBaseURL()}/products`, data);
export const updateProduct = (id, data) => axios.put(`${getBaseURL()}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${getBaseURL()}/products/${id}`);

// Sales
export const fetchSales = () => axios.get(`${getBaseURL()}/sales${USE_MYSQL_API ? '' : '?_expand=product'}`);
export const createSale = (data) => axios.post(`${getBaseURL()}/sales`, data);

// Supplier
export const createSupplier = (data) => axios.post(`${getBaseURL()}/suppliers`, data);
export const updateSupplier = (id, data) => axios.put(`${getBaseURL()}/suppliers/${id}`, data);
export const deleteSupplier = (id) => axios.delete(`${getBaseURL()}/suppliers/${id}`);
