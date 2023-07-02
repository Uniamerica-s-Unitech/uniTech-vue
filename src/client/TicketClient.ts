import axios, { AxiosInstance } from "axios";

import { Ticket } from "@/modal/ticket";

export class TicketClient{
    private axiosTicket : AxiosInstance;

    constructor(){
        this.axiosTicket = axios.create({
            baseURL:'http://localhost:8080/api/ticket',
            headers:{'Content-Type':'application/json'}
        });
    }

    public async findById(id : number) : Promise<Ticket> {
        try {
            return (await this.axiosTicket.get<Ticket>(`/${id}`)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }

    public async listAll() : Promise<Ticket[]> {
        try{
            return(await this.axiosTicket.get<Ticket[]>(`/lista`)).data;
        } catch(error :any){
            return Promise.reject(error.response);
        }
    }
    public async listaAberta() : Promise<Ticket[]> {
        try{
            return(await this.axiosTicket.get<Ticket[]>(`/aberta`)).data;
        } catch(error :any){
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(ticket : Ticket) : Promise<string> {
        try{
            return(await this.axiosTicket.post<string>(``, ticket)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(id: number , ticket : Ticket) : Promise<string> {
        try {
            return(await this.axiosTicket.put<string>(`/${id}`, ticket)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }
}
export default new TicketClient;