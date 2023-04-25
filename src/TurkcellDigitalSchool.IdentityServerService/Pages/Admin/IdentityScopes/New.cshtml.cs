using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TurkcellDigitalSchool.IdentityServerService.Pages.Admin.IdentityScopes
{
    [SecurityHeaders]
    [Authorize]
    public class NewModel : PageModel
    {
        private readonly IdentityScopeRepository _repository;

        public NewModel(IdentityScopeRepository repository)
        {
            _repository = repository;
        }

        [BindProperty]
        public IdentityScopeModel InputModel { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync(CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {
                await _repository.CreateAsync(InputModel);
                return RedirectToPage("/Admin/IdentityScopes/Edit", new { id = InputModel.Name });
            }

            return Page();
        }
    }
}