import API from "./api";


export default class AccountService{

    static async deleteAccount(){
      
        const response = await API.delete("/account/me");
        return response.data;

    }

     static async getAccount(){
      
        const response =await API.get("/account/me");
        return response.data;

     }
 
    static async updateAccount(updateAccountDto){
      const response = await API.post("/account/me",updateAccountDto);
      return response.data;

    }

    static async getProfilePicture(){
      const response = await API.get("/account/me/profilePicture");
      return response.data;

    }

    static async updateProfilePicture(){
      const response = await API.post("/account/me/profilePicture");
      return response;

    }

    static async deleteProfilePicture(){
      const response = await API.delete("/account/me/profilePicture");
      return response;
    }


}