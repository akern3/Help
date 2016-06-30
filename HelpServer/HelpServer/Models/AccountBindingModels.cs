using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace HelpServer.Models
{
    // Models used as parameters to AccountController actions.

    public class AddExternalLoginBindingModel
    {
        [Required]
        [Display(Name = "External access token")]
        public string ExternalAccessToken { get; set; }
    }

    public class ChangePasswordBindingModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class RegisterBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [Display(Name = "matricula")]
        public string matricula { get; set; }

        [Display(Name = "Acesso Aprovado")]
        public bool acessoAprovado { get; set; }

        [Display(Name = "Ativo")]
        public bool ativo { get; set; }

        [Required]
        [Display(Name = "Nome")]
        public string nome { get; set; }
    }

    public class RegisterExternalBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class RemoveLoginBindingModel
    {
        [Required]
        [Display(Name = "Login provider")]
        public string LoginProvider { get; set; }

        [Required]
        [Display(Name = "Provider key")]
        public string ProviderKey { get; set; }
    }

    public class SetPasswordBindingModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }


    #region Incluido Manualmente
    public class UsuarioViewModel
    {
        public string nome { get; set; }
        public string matricula { get; set; }
        public string userName { get; set; }
        public string id { get; set; }
        public bool acessoAprovado { get; set; }
        public bool ativo { get; set; }
        public System.Collections.Generic.IList<string> roles { get; set; }

    } 

    public class EstatisticasSolicitacoes
    {
        public int CriticidadeAlta { get; set; }
        public int CriticidadeMedia { get; set; }
        public int CriticidadeBaixa { get; set; }
        public int StatusEmAberto { get; set; }
        public int StatusEmAnalise { get; set; }
        public int StatusEncerrado { get; set; }
        public int SolicitacoesSetorLaboratorio { get; set; }
        public int SolicitacosSetorSalaDeAula { get; set; }
    }
    #endregion
}
