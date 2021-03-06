﻿using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;

namespace HelpServer.Models
{
    // Models returned by AccountController actions.

    public class ExternalLoginViewModel
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public string State { get; set; }
    }

    public class ManageInfoViewModel
    {
        public string LocalLoginProvider { get; set; }

        public string Email { get; set; }

        public IEnumerable<UserLoginInfoViewModel> Logins { get; set; }

        public IEnumerable<ExternalLoginViewModel> ExternalLoginProviders { get; set; }


        #region Incluidos manualmente

        public string nome { get; set; }
        public string matricula { get; set; }
        public ICollection<IdentityUserRole> roles { get; set; }
        #endregion
    }

    public class UserInfoViewModel
    {

        public string Email { get; set; }

        public bool HasRegistered { get; set; }

        public string LoginProvider { get; set; }

    }

    public class UserLoginInfoViewModel
    {
        public string LoginProvider { get; set; }

        public string ProviderKey { get; set; }

    }
}
