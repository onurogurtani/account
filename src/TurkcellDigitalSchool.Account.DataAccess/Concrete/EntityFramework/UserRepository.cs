using System.Collections.Generic;
using System.Linq;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class UserRepository : EfEntityRepositoryBase<User, ProjectDbContext>, IUserRepository
    {
        public UserRepository(ProjectDbContext context)
            : base(context)
        {
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
            return (from user in Context.Users
                    join userRole in Context.UserRoles on user.Id equals userRole.UserId
                    join roleClaim in Context.RoleClaims on userRole.RoleId equals roleClaim.RoleId
                    where user.Id == userId
                    select new
                    {
                        roleClaim.ClaimName
                    }).Distinct().ToList().Select(s => new OperationClaim { Name = s.ClaimName }).ToList();

            //todo: Rol Yetki GEt Claims  sorgusu kullanýcýnýn sahip olduðu paketlerlede iliþkilenirilip detaylandýrýlacak.;


            //var result = (from user in Context.Users // Admin Types
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
            //                                      {
            //                                          operationClaim.Name
            //                                      }).
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
    }
}