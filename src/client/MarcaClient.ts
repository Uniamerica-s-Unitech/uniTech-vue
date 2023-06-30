import axios, { AxiosInstance } from "axios";

import { Marca } from "@/modal/marca";

export class MarcaClient{
    private axiosMarca : AxiosInstance;

    constructor(){
        this.axiosMarca = axios.create({
            baseURL:'http://localhost:8080/api/marca',
            headers:{'Content-Type':'application/json'}
        });
    }

    public async findById(id : number) : Promise<Marca> {
        try {
            return (await this.axiosMarca.get<Marca>(`/${id}`)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }

    public async listAll() : Promise<Marca[]> {
        try{
            return(await this.axiosMarca.get<Marca[]>(`/lista`)).data;
        } catch(error :any){
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(marca : Marca) : Promise<string> {
        try{
            return(await this.axiosMarca.post<string>(``, marca)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(id: number , marca : Marca) : Promise<string> {
        try {
            return(await this.axiosMarca.put<string>(`/${id}`, marca)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async deletar(id: number) : Promise<string> {
        try {
            return (await this.axiosMarca.delete<string>(`/${id}`)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }
}
export default new MarcaClient;