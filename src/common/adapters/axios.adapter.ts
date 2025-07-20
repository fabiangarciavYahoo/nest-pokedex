import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios;
  }

  async get<T = any>(url: string, config?: any): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url, config);
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw new Error(`Failed to fetch data from ${url}`);
    }
  }

  async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.axios.post<T>(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.axios.put<T>(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: any): Promise<T> {
    const response = await this.axios.delete<T>(url, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.axios.patch<T>(url, data, config);
    return response.data;
  }
}