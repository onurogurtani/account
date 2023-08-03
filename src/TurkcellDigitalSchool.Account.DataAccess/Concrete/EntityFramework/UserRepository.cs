using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Diagnostics;
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
            if (userAddingType == UserAddingType.Default) { throw new System.Exception("ExternalLogin'ler i�in userAddingType Default olamaz!"); }

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
            var claims = (from user in Context.Users
                          join userRole in Context.UserRoles on user.Id equals userRole.UserId
                          join roleClaim in Context.RoleClaims on userRole.RoleId equals roleClaim.RoleId
                          where user.Id == userId
                          && !userRole.IsDeleted && !roleClaim.IsDeleted
                          select new
                          {
                              roleClaim.ClaimName
                          }).Distinct().ToList();


            var now = DateTime.Now.Date;
            var packageRoleIds = (from up in Context.UserPackages
                                  join p in Context.Packages on up.Id equals p.Id
                                  join pr in Context.PackageRoles.Where(w => !w.IsDeleted) on up.PackageId equals pr.PackageId
                                  where p.IsActive && !up.IsDeleted && !pr.IsDeleted && p.StartDate <= now && p.FinishDate >= now
                                  select pr.RoleId
                ).ToList();


            var packageClaims = (Context.RoleClaims.Where(w => packageRoleIds.Contains(w.RoleId) && !w.IsDeleted)
                .Select(s => new
                {
                    s.ClaimName
                })
                .Distinct()
                .ToList());



            claims = claims.Union(packageClaims).ToList();

            var platformClaims = _claimDefinitionService.GetClaimDefinitions().Where(w => w.ModuleType == ModuleType.Platform);


            var packageMenuAccessClaims = Context.PackageMenuAccesses.Where(w => Context.UserPackages.Include(i => i.Package).Any(ww => !ww.IsDeleted
                && ww.Package.IsMenuAccessSet
                && ww.Package.IsActive && ww.Package.StartDate <= now && ww.Package.FinishDate >= now &&
                 ww.PackageId == w.PackageId && ww.UserId == userId
             )).Select(s => new { ClaimName = s.Claim }).Distinct().ToList();

            if (packageMenuAccessClaims.Any())
            {
                claims = claims.Union(packageMenuAccessClaims).ToList();

                var unSelectedPlatformClaims = platformClaims.Select(s => new
                {
                    claimName = s.Name,
                    selected = packageMenuAccessClaims.Any(a => a.ClaimName == s.Name)
                }).ToList().Where(w => !w.selected).ToList();


                claims = claims.Where(w => unSelectedPlatformClaims.Any(a => a.claimName != w.ClaimName)).ToList();
            }
            else
            {
                var unSelectedPlatformClaims = platformClaims.Select(s => new
                {
                    claimName = s.Name,
                    selected = false
                }).ToList().Where(w => !w.selected).ToList(); 
                claims = claims.Where(w => unSelectedPlatformClaims.Any(a => a.claimName != w.ClaimName)).ToList();
            } 

            var result = claims
                 .Select(s => new OperationClaim { Name = s.ClaimName }).ToList();

            return result;


            //                                      {
            //                                          operationClaim.Name
            //                                      }).            //var result = (from user in Context.Users // Admin Types
            //              join adminTypeGroup in Context.AdminTypeGroups on  (long?)user.AdminTypeEnum equals adminTypeGroup.AdminTypeId
            //              join userGroup in Context.Groups on adminTypeGroup.GroupId equals userGroup.Id
            //              join groupClaim in Context.GroupClaims on userGroup.Id equals groupClaim.GroupId
            //              join operationClaim in Context.OperationClaims on groupClaim.OperationClaimId equals operationClaim.Id
            //              where user.Id == userId
            //              select new
            //              {
            //                  operationClaim.Name
            //              })
            //                    .Union(from user in Context.Users // User Types
            //                           join userTypeGroup in Context.UserTypeGroups on (long?)user.UserTypeEnum equals userTypeGroup.UserTypeId
            //                           join userGroup in Context.Groups on userTypeGroup.GroupId equals userGroup.Id
            //                           join groupClaim in Context.GroupClaims on userGroup.Id equals groupClaim.GroupId
            //                           join operationClaim in Context.OperationClaims on groupClaim.OperationClaimId equals operationClaim.Id
            //                           where user.Id == userId
            //                           select new
            //                           {
            //                               operationClaim.Name
            //                           }).
            //                          Union(from user in Context.Users // UserGroups
            //                                join userGroup in Context.UserGroups on user.Id equals userGroup.UserId
            //                                join groupClaim in Context.GroupClaims on userGroup.GroupId equals groupClaim.GroupId
            //                                join operationClaim in Context.OperationClaims on groupClaim.OperationClaimId equals operationClaim.Id
            //                                where user.Id == userId
            //                                select new
            //                                {
            //                                    operationClaim.Name
            //                                }).
            //                                Union(from user in Context.Users // UserPackages
            //                                      join userPackage in Context.UserPackages on user.Id equals userPackage.UserId
            //                                      join packageGroup in Context.PackageGroups on userPackage.PackageId equals packageGroup.PackageId
            //                                      join groupClaim in Context.GroupClaims on packageGroup.GroupId equals groupClaim.GroupId
            //                                      join operationClaim in Context.OperationClaims on groupClaim.OperationClaimId equals operationClaim.Id
            //                                      where user.Id == userId
            //                                      select new
            //                                        Union(from user in Context.Users // UserClaims
            //                                              join userClaim in Context.UserClaims on user.Id equals userClaim.UserId
            //                                              join operationClaim in Context.OperationClaims on userClaim.OperationClaimId equals operationClaim.Id
            //                                              where user.Id == userId
            //                                              select new
            //                                              {
            //                                                  operationClaim.Name
            //                                              });

            //return result.Select(x => new OperationClaim { Name = x.Name }).Distinct().ToList();
            return new();
        }

        public bool HasClaim(long userId, string claimName)
        {
            return Context.Users.Include(i => i.UserRoles).ThenInclude(i => i.Role).ThenInclude(i => i.RoleClaims)
                  .Any(a => a.Id == userId &&
                            a.UserRoles.Any(aa => aa.Role.RoleClaims.Any(aaa => aaa.ClaimName == claimName)));
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