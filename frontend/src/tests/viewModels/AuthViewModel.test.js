import RegisterAccountDto from "../../dto/auth/registerAccountDto"
import AuthViewModel from '../../viewModels/AuthViewModel';

describe("AuthViewModel Intergration Test", () => {
    it("register a new account and return the AccountDto as response", async () => {
        const registerAccountDto = new RegisterAccountDto();
        registerAccountDto.fullName = "example full name"
        registerAccountDto.DOB = new Date("2004-8-15")
        registerAccountDto.email = "exampleEmail@example.com"
        registerAccountDto.password = "2304asdfASDFA@$12541"
        registerAccountDto.username = "exampleUserName"


        const response = await AuthViewModel.registerAccount(registerAccountDto);

        expect(response).toHaveProperty("email", "exampleEmail@example.com")
        expect(response.id).not.toBe("");
        expect(response).toHaveProperty("userName", "exampleUserName")

    });

})