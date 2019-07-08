using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MASWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MASWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        //GET : /api/UserProfile
        public async Task<object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.Email,
                user.UserName
            };
        }

        [HttpGet]
        [Authorize(Roles ="Admin")]
        [Route("ForAdmin")]

        public string GetForAdmin()
        {
            return "Web method for Admin";
        }

        [HttpGet]
        [Authorize(Roles = "Manager1")]
        [Route("ForManager1")]

        public string GetForManager1()
        {
            return "Web method for Manager1";
        }

        [HttpGet]
        [Authorize(Roles = "Manager2")]
        [Route("ForManager2")]

        public string GetForManager2()
        {
            return "Web method for Manager2";
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("ForUser")]

        public string GetForUser()
        {
            return "Web method for User";
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Manager1,Manager2,User")]
        [Route("ForAllRoles")]

        public string GetForAllRoles()
        {
            return "Web method for AllRoles";
        }
    }
}