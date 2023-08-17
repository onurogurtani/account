using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.AuthorityManagement.Services.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class UserRepository : EfEntityRepositoryBase<User, AccountDbContext>, IUserRepository
    {
        private readonly IClaimDefinitionService _claimDefinitionService;
        public UserRepository(AccountDbContext context, IClaimDefinitionService claimDefinitionService)
            : base(context)
        {
            _claimDefinitionService = claimDefinitionService;
        }

        public bool IsExistForExternalLogin(UserAddingType userAddingType, string relatedIdentity)
        {
            return Context.Users.Any(q => q.AddingType == userAddingType && q.RelatedIdentity == relatedIdentity);
        }

        public User AddOrUpdateForExternalLogin(UserAddingType userAddingType, string relatedIdentity, string oauthAccessToken, string oauthOpenIdConnectToken, string name, string surname, string email, string phone)
        {
            if (userAddingType == UserAddingType.Default) { throw new System.Exception("ExternalLogin'ler için userAddingType Default olamaz!"); }

            var isExist = IsExistForExternalLogin(userAddingType, relatedIdentity);

            User userEntity = null;
            if (!isExist)
            {
                userEntity = new User()
                {
                    AddingType = userAddingType,
                    RelatedIdentity = relatedIdentity,
                    Name = name,
                    SurName = surname,
                    Email = email,
                    MobilePhones = phone
                };
            }
            else
            {
                userEntity = Context.Users.FirstOrDefault(q => q.AddingType == userAddingType && q.RelatedIdentity == relatedIdentity);
            }

            // Ortak alanlar
            userEntity.OAuthAccessToken = oauthAccessToken;
            userEntity.OAuthOpenIdConnectToken = oauthOpenIdConnectToken;
            userEntity.OAuthAccessToken = oauthAccessToken;


            if (!isExist) Context.Users.Add(userEntity);

            SaveChanges();

            return userEntity;
        }

         
        public List<OperationClaim> GetClaims(long userId)
        { 
            var userType = Context.Users.Where(w => w.Id == userId).Select(s => s.UserType).FirstOrDefault();
           

            // Kullanýcýnýn sahip olduðu rollerin claimleri  
            var claims  = (from user in Context.Users
                          join userRole in Context.UserRoles on user.Id equals userRole.UserId
                          join roleClaim in Context.RoleClaims on userRole.RoleId equals roleClaim.RoleId
                          where user.Id == userId
                          && !userRole.IsDeleted && !roleClaim.IsDeleted
                          select new
                          {
                              roleClaim.ClaimName
                          }).Distinct().ToList();
            //////////////////////////////////////////////////


            // Kullanýcýnýn Sahip olduðu paketlerden gelen rollerin yetkileri
            var now = DateTime.Now.Date;
            var packageRoleIds = new List<long>();

            if (userType == UserType.Parent)
            {

                packageRoleIds = (from up in Context.UserPackages.Where(w => !w.IsDeleted)
                                  join p in Context.Packages.Where(w => !w.IsDeleted && w.IsActive) on up.PackageId equals p.Id
                                  join pr in Context.PackageRoles.Where(w => !w.IsDeleted &&  Context.Roles.Any(aa=>!aa.IsDeleted && aa.Id == w.RoleId && aa.UserType==UserType.Parent)) on up.PackageId equals pr.PackageId
                                  where Context.StudentParentInformations.Any(w => w.ParentId == userId && w.UserId == up.UserId && !w.IsDeleted)
                                  && p.StartDate <= now && p.FinishDate >= now
                                  select pr.RoleId).ToList();
            }
            else
            {
                packageRoleIds = (from up in Context.UserPackages.Where(w => !w.IsDeleted)
                                  join p in Context.Packages.Where(w => !w.IsDeleted && w.IsActive) on up.PackageId equals p.Id
                                  join pr in Context.PackageRoles.Where(w => !w.IsDeleted) on up.PackageId equals pr.PackageId
                                  where
                                  up.UserId == userId && p.StartDate <= now && p.FinishDate >= now
                                  select pr.RoleId
                            ).ToList();
            }
             
            var packageClaims = (Context.RoleClaims.Where(w => packageRoleIds.Contains(w.RoleId) && !w.IsDeleted)
                .Select(s => new
                {
                    s.ClaimName
                })
                .Distinct()
                .ToList());

            //////////////////////////////////////////////////
            

            claims = claims.Union(packageClaims).Distinct().ToList();


            if (userType!=UserType.Student)
            {
                return claims
                .Select(s => new OperationClaim { Name = s.ClaimName }).ToList();
            }



            var platformClaims = _claimDefinitionService.GetClaimDefinitions().Where(w => w.ModuleType == ModuleType.Platform)
                 .Select(s => new
                 {
                     claimName = s.Name,
                     selected = false
                 }).ToList();


            var packageMenuAccessClaims = Context.PackageMenuAccesses.Where(w => Context.UserPackages.Include(i => i.Package).Any(ww => !ww.IsDeleted
                && ww.Package.IsMenuAccessSet
                && ww.Package.IsActive && ww.Package.StartDate <= now && ww.Package.FinishDate >= now &&
                 ww.PackageId == w.PackageId && ww.UserId == userId
             )).Select(s => new {PackageId = s.PackageId , ClaimName = s.Claim }).Distinct().ToList();

          

            if (packageMenuAccessClaims.Any())
            {
                var packageIds = packageMenuAccessClaims.Select(s => s.PackageId).Distinct().ToList();

                foreach (var itemPackageId in packageIds)
                {
                    platformClaims = (from x in platformClaims
                                     join y in packageMenuAccessClaims.Where(w => w.PackageId == itemPackageId) on x.claimName equals y.ClaimName into yy
                                     from y in yy.DefaultIfEmpty()
                                     select new
                                     {
                                         claimName = x.claimName,
                                         selected = x.selected || y != null
                                      }).ToList();

                }


                claims = claims.Where(w => !platformClaims.Where(ww => !ww.selected).Select(s => s.claimName).ToList().Contains(w.ClaimName)).ToList();


                claims.AddRange(platformClaims.Where(ww => ww.selected).Select(s => new { ClaimName = s.claimName }).ToList());

                claims = claims.Distinct().ToList();
            } 

            var result = claims
                 .Select(s => new OperationClaim { Name = s.ClaimName }).ToList();
             
            return result; 
        }

     

        public async Task ResetFailLoginOtpCount(long userId)
        {
            var user = await Context.Users.FirstOrDefaultAsync(w =>
                w.Id == userId);

            if (user == null)
            {
                return;
            }
            user.FailOtpCount = 0;
            await Context.SaveChangesAsync(CancellationToken.None);

        }

        public async Task<int> IncFailLoginOtpCount(long userId)
        {
            var user =
                await Context.Users.FirstOrDefaultAsync(w =>
                    w.Id == userId);

            if (user == null)
            {
                return 0;
            }

            user.FailOtpCount = (user.FailOtpCount ?? 0) + 1;
            await Context.SaveChangesAsync();
            return (user.FailOtpCount ?? 0);
        }

        public async Task<int> GetFailLoginOtpCount(long userId)
        {
            var loginFailCounter = await Context.Users.FirstOrDefaultAsync(w => w.Id == userId);
            return (loginFailCounter?.FailOtpCount ?? 0);
        }

        public async Task<bool> IsPackageBuyer(long userId)
        {
            var isPackageBuyer = await Context.UserPackages.AnyAsync(w => w.UserId == userId);
            return isPackageBuyer;
        }

    }


}