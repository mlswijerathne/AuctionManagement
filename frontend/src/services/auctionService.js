import API from "./api";

export default class AccountService{

    static async addAuction(){
        
        const response = await API.post("/api/Auction");
        return response.data;
    }

    static async getAllAuction(){
        
        const response = await API.get("/api/Auction");
        return response.data;
    }

    static async getAuction(){
        
        const response = await API.get("/api/Auction/{id}");
        return response.data;
    }

    static async updateAuction(){
        
        const response = await API.put("/api/Auction/{id}");
        return response.data;
    }

    static async deleteAuction(){

        const response = await API.delete("/api/Auction/{id}");
        return response.data;
    }

}