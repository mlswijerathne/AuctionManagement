using DreamBid.Dtos.Account;
using DreamBid.Dtos.Error;
using DreamBid.Dtos.User;
using DreamBid.Extensions;
using DreamBid.Interfaces;
using DreamBid.Mappers;
using HeyRed.Mime;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DreamBid.Controllers
{
    [Route("api/v1/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<DreamBid.Models.User> _userManager;
        private readonly SignInManager<DreamBid.Models.User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IFileManagerService _fileManagerService;
        private readonly ILogger<AccountController> _logger;
        private readonly string _profilePicturePath = "users/profilePictures/";

        public AccountController(UserManager<DreamBid.Models.User> userManager, ITokenService tokenService, SignInManager<DreamBid.Models.User> signInManager, ILogger<AccountController> logger, IFileManagerService fileManagerService)
        {
            this._userManager = userManager;
            this._tokenService = tokenService;
            this._signInManager = signInManager;
            this._logger = logger;
            this._fileManagerService = fileManagerService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var UserRole = "User";
            //  This checks if the data received in the registerDto object is valid according to the validation rules defined in the model (such as required fields or data formats).
            if (!ModelState.IsValid) return BadRequest(ErrorMessage.ErrorMessageFromModelState(ModelState));

            var user = registerDto.ToUserFromRegisterDto();

            var createdUserResult = await _userManager.CreateAsync(user, registerDto.Password!);        // attempts to create a new user in the system with the provided User object and registerDto.Password (hashed and stored).

            if (!createdUserResult.Succeeded) return StatusCode(500, ErrorMessage.ErrorMessageFromIdentityResult(createdUserResult));

            var roleResult = await _userManager.AddToRolesAsync(user, new string[] { UserRole });

            if (!roleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);
                return StatusCode(500, ErrorMessage.ErrorMessageFromIdentityResult(roleResult));
            }

            Response.Headers.Append("x-auth-token", _tokenService.CreateToken(user, UserRole));

            return Ok(user.ToUserDto());
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ErrorMessage.ErrorMessageFromModelState(ModelState));

            var user = await _userManager.Users.FirstOrDefaultAsync(user => user.Email.ToLower() == loginDto.Email.ToLower());
            if (user == null)
            {
                return Unauthorized(ErrorMessage.ErrorMessageFromString("Invalid Username or Password"));
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
                return Unauthorized(ErrorMessage.ErrorMessageFromString("Invalid Username or Password"));

            Response.Headers.Append("x-auth-token", _tokenService.CreateToken(user, "User"));

            return Ok(user.ToUserDto());
        }

        [HttpDelete("me")]
        [Authorize]
        public async Task<IActionResult> DeleteUser()
        {
            var userId = User.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null) return NotFound(ErrorMessage.ErrorMessageFromString("The user doesn't exists"));

            await _userManager.DeleteAsync(user);

            this.DeleteUserData(user);

            return Ok(user.ToUserDto());

        }

        [HttpGet("me")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUser()
        {
            var userId = User.GetUserId();

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null) return NotFound(ErrorMessage.ErrorMessageFromString("The user doesn't exists"));

            return Ok(user.ToUserDto());
        }

        [HttpPost("me")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto updateUserDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ErrorMessage.ErrorMessageFromModelState(ModelState));

            var userId = User.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null) return NotFound(ErrorMessage.ErrorMessageFromString("The user doesn't exists"));

            var result = await _userManager.UpdateAsync(updateUserDto.ToUserFromUpdateUserDto(user));

            if (!result.Succeeded)
                return StatusCode(500, ErrorMessage.ErrorMessageFromString("Internal Server Error. Failed to upate the user"));

            return Ok(user.ToUserDto());
        }

        [HttpGet("me/profilePicture")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetProfilePicture()
        {
            var userId = User.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound(ErrorMessage.ErrorMessageFromString("The user doesn't exists"));

            var profilePicturePath = user.ProfilePicuturePath;
            if (profilePicturePath == null) return NotFound(ErrorMessage.ErrorMessageFromString("The Profile picture not found"));

            var fileBytes = await this._fileManagerService.GetFile(profilePicturePath);

            if (fileBytes == null) return NotFound(ErrorMessage.ErrorMessageFromString("The Profile picture not found"));

            return File(fileBytes, MimeTypesMap.GetMimeType(profilePicturePath));
        }

         [HttpPost("me/profilePicture")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> SaveProfilePicture(IFormFile profilePicture)
        {
            var userId = User.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound(ErrorMessage.ErrorMessageFromString("The user doesn't exists"));

            if (profilePicture == null || profilePicture.Length <= 0) return BadRequest(ErrorMessage.ErrorMessageFromString("Place give valid image for the profile picture"));

            // remove existing profile picture
            if (user.ProfilePicuturePath != null) this._fileManagerService.RemoveFileWithAnyExtension(user.ProfilePicuturePath);

            // generate new profile picture filename
            var fileName = $"{user.Id}{Path.GetExtension(profilePicture.FileName)}";
            var subFilePathName = Path.Combine(this._profilePicturePath, fileName);

            // store the profile picture
            this._logger.LogCritical("Saving");
            var newFilePath = await this._fileManagerService.StoreFile(profilePicture, subFilePathName, true);
            this._logger.LogCritical($"The value is {newFilePath}");
            this._logger.LogCritical("Saved");
            if (newFilePath == null) return StatusCode(500, ErrorMessage.ErrorMessageFromString("Internal Server Error. Failed to save the profile picture"));
            user.ProfilePicuturePath = newFilePath;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return StatusCode(500, ErrorMessage.ErrorMessageFromString("Internal Server Error. Failed to upate the user"));

            return Ok();
        }

        private void DeleteUserData(DreamBid.Models.User user)
        {
            // delete profile picture
            if (user.ProfilePicuturePath != null)
                this._fileManagerService.RemoveFileWithAnyExtension(user.ProfilePicuturePath);
        }
    }
}
