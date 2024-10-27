using DreamBid.Dtos.Account;
using DreamBid.Dtos.User;
using DreamBid.Models;

namespace DreamBid.Mappers
{
    public static class UserMappers
    {
        public static UserDto ToUserDto(this User userModel)
        {
            return new UserDto
            {
                UserName = userModel.UserName,
                Email = userModel.Email,
                Id = userModel.Id,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                DOB = userModel.DOB,
                ContactNumber = userModel.ContactNumber,
                Address = userModel.Address,
                Role = userModel.Role
                
                
            };
        }

        public static User ToUserFromRegisterDto(this RegisterDto registerDto)
        {
            return new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
                DOB = registerDto.DOB,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                ContactNumber = registerDto.ContactNumber,
                Address = registerDto.Address
                
                
            };
        }

        public static User ToUserFromUpdateUserDto(this UpdateUserDto updateUserDto, User? existingUser)
        {
            var user = existingUser ?? new User();

            user.FirstName = updateUserDto.FirstName ?? user.FirstName;
            user.LastName = updateUserDto.LastName ?? user.LastName;
            user.DOB = updateUserDto.DOB ?? user.DOB;
            user.ContactNumber = updateUserDto.ContactNumber ?? user.ContactNumber;
            user.Address = updateUserDto.Address ?? user.Address;
           
            return user;
        }

    }
}