import AccountDto from "../dto/account/accountDto";

export default class AccountMapper {

    static ToAccountDto(data) {
        let accountDto = new AccountDto();
        accountDto.userName = data.userName;
        accountDto.email = data.email;
        accountDto.firstName = data.firstName;
        accountDto.lastName = data.lastName;
        accountDto.DOB = new Date(data.dob);
        accountDto.id = data.id;
        accountDto.ContactNumber = data.contactNumber;
        accountDto.address = data.address;

        return accountDto;
    }

}