using DotNetCore.CAP;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.DirectoryServices.Protocols;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Configure;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.MessageBrokers.RabbitMq;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using static TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands.LdapUserInfoCommand;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    public class LdapUserInfoCommand : IRequest<IResult>
    {
        [MessageClassAttr("Get Ldap Users Into System")]
        public class LdapUserInfoCommandHandler : IRequestHandler<LdapUserInfoCommand, IResult>
        {
            private LdapConnection _ldapConnection;
            private SearchResponse _ldapSearchResponse;
            private readonly IUserRepository _userRepository;
            private readonly ILdapUserInfoRepository _ldapUserInfoRepository;
            private readonly IConfiguration _configuration;
            private readonly ICapPublisher _capPublisher;
            LdapConfig ldapConfig;
            public LdapUserInfoCommandHandler(IUserRepository userRepository, ILdapUserInfoRepository ldapUserInfoRepository, IConfiguration configuration, ICapPublisher capPublisher)
            {
                _userRepository = userRepository;
                _ldapUserInfoRepository = ldapUserInfoRepository;
                _configuration = configuration;
                _capPublisher = capPublisher;
                ldapConfig = _configuration.GetSection("LdapConfig").Get<LdapConfig>();
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string LdapUsersIsNotFound = Common.Constants.Messages.LdapUsersIsNotFound;

            [MessageConstAttr(MessageCodeType.Error)]
            private static string LdapConnectionFail = Common.Constants.Messages.LdapConnectionFail;

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Common.Constants.Messages.SuccessfulOperation;

            [SecuredOperation]
            public async Task<IResult> Handle(LdapUserInfoCommand request, CancellationToken cancellationToken)
            {
                bool isLdapConnect = isAdminConnectDAP().Result;
                try
                {
                    if (!string.IsNullOrEmpty(ldapConfig.searchFilter))
                    {
                        string searchFilter = ldapConfig.searchFilter;

                        //LDAP aranacak DN bilgisi
                        string dn = ldapConfig.Dn;

                        SearchRequest ldapSearchRequest;
                        ldapSearchRequest = new SearchRequest(dn, string.Format(searchFilter), SearchScope.Subtree, null);
                        if (_ldapConnection != null)
                        {
                            _ldapSearchResponse = (SearchResponse)_ldapConnection.SendRequest(ldapSearchRequest);
                            if (_ldapSearchResponse.Entries.Count > 0)
                            {
                                for (int i = 0; i <= _ldapSearchResponse.Entries.Count; i++)
                                {
                                    //LDAP kullanýcýsýnýn detaylý bilgilerini alma - Kullanýcýya ait email bilgisini çekme
                                    var mail = _ldapSearchResponse.Entries[i].Attributes["mail"][0].ToString();
                                    var mobile = _ldapSearchResponse.Entries[i].Attributes["mobile"][0].ToString();
                                    var fullName = _ldapSearchResponse.Entries[i].Attributes["cn"][0].ToString();
                                    var firstName = _ldapSearchResponse.Entries[i].Attributes["turkishfirstname"][0].ToString();
                                    var lastName = _ldapSearchResponse.Entries[i].Attributes["turkishlastname"][0].ToString();
                                    var uid = _ldapSearchResponse.Entries[i].Attributes["uid"][0].ToString();
                                    var objectClass = _ldapSearchResponse.Entries[i].Attributes["objectClass"][0].ToString();
                                    var group = _ldapSearchResponse.Entries[i].Attributes["ou"][0].ToString();
                                    var positionName = _ldapSearchResponse.Entries[i].Attributes["positionname"][0].ToString();
                                    var sn = _ldapSearchResponse.Entries[i].Attributes["sn"][0].ToString();
                                    var birthDate = _ldapSearchResponse.Entries[i].Attributes["birthdate"][0].ToString();
                                    var unitName = _ldapSearchResponse.Entries[i].Attributes["unitName"][0].ToString();
                                    var divisionGroupName = _ldapSearchResponse.Entries[i].Attributes["divisiongroupname"][0].ToString();
                                    var managerName = _ldapSearchResponse.Entries[i].Attributes["managerName"][0].ToString();
                                    var userPassword = _ldapSearchResponse.Entries[i].Attributes["userpassword"][0].ToString();
                                    var statusAccount = _ldapSearchResponse.Entries[i].Attributes["status"][0].ToString();

                                    var ldapUserExist = await _ldapUserInfoRepository.GetAsync(
                                        w => w.Status && (
                                        w.UId == uid ||
                                        w.Mail == mail ||
                                        w.Mobile == mobile
                                        ));
                                    if (ldapUserExist != null) continue;

                                    LdapUserInfo ldapUserInfo = new LdapUserInfo()
                                    {
                                        UId = uid,
                                        Mail = mail,
                                        Mobile = mobile,
                                        FullName = fullName,
                                        BirthDate = DateTime.Parse(birthDate, new CultureInfo("en-US")),
                                        DivisionGroupName = divisionGroupName,
                                        ManagerName = managerName,
                                        Group = group,
                                        PositionName = positionName,
                                        Sn = sn,
                                        ObjectClass = objectClass,
                                        UnitName = unitName,
                                        Status = true,
                                    };

                                    _ldapUserInfoRepository.Add(ldapUserInfo);
                                    await _ldapUserInfoRepository.SaveChangesAsync();
                                    await _capPublisher.PublishAsync(ldapUserInfo.GeneratePublishName(EntityState.Added),
                                        ldapUserInfo, cancellationToken: cancellationToken);

                                    var userExist = await _userRepository.GetAsync(
                                        w => w.Status && (
                                        w.UserName == uid ||
                                        w.Email == mail ||
                                        w.MobilePhones == mobile
                                        ));
                                    if (userExist != null) continue;

                                    HashingHelper.CreatePasswordHash(userPassword, out var passwordSalt, out var passwordHash);
                                    User user = new User
                                    {
                                        UserType = UserType.Admin,
                                        CitizenId = 11111111111,
                                        Name = firstName,
                                        SurName = lastName,
                                        UserName = uid,
                                        Email = mail,
                                        MobilePhones = mobile,
                                        PasswordHash = passwordHash,
                                        PasswordSalt = passwordSalt,
                                        IsLdapUser = true,
                                        Status = true
                                    };
                                    _userRepository.Add(user);
                                    await _userRepository.SaveChangesAsync();
                                    await _capPublisher.PublishAsync(user.GeneratePublishName(EntityState.Added),
                                        user, cancellationToken: cancellationToken);
                                }
                            }
                        }
                        else
                        {
                            _ldapConnection.Dispose();
                            return new SuccessResult(LdapConnectionFail.PrepareRedisMessage());
                        }
                    }
                    else
                    {
                        _ldapConnection.Dispose();
                        return new SuccessResult(LdapUsersIsNotFound.PrepareRedisMessage());
                    }
                }
                catch (Exception ex)
                {
                    _ldapConnection.Dispose();
                    return new SuccessResult(LdapConnectionFail.PrepareRedisMessage());
                }
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
            private Task<bool> isAdminConnectDAP()
            {
                string host = ldapConfig.Host;
                string portValue = ldapConfig.PortValue;
                string adminUser = ldapConfig.AdminUser;
                string adminPass = ldapConfig.AdminPass;
                string ldapSecurityMethod = ldapConfig.PortValue;

                try
                {
                    //LDAP Parametre validasyon kontrolü
                    if (isAdminValidation(ldapConfig).Result)
                    {
                        int port = int.Parse(portValue);
                        _ldapConnection = new LdapConnection(host + ":" + port);

                        NetworkCredential authAdmin = new NetworkCredential(adminUser, adminPass);
                        _ldapConnection.Credential = authAdmin;
                        _ldapConnection.AuthType = AuthType.Basic;
                        _ldapConnection.SessionOptions.ProtocolVersion = 3;

                        _ldapConnection.SessionOptions.VerifyServerCertificate += delegate { return true; };
                        _ldapConnection.SessionOptions.SecureSocketLayer = true;
                        _ldapConnection.Bind();
                        return Task.FromResult(true);
                    }
                    else
                    {
                        return Task.FromResult(false);
                    }
                }
                catch (Exception ex)
                {
                    //Admin LDAP baðlantýsý gerçekleþmedi! ;
                    _ldapConnection.Dispose();
                    return Task.FromResult(false);
                }
            }

            //Admin Bilgi Validasyon Ýþlemleri
            private Task<bool> isAdminValidation(LdapConfig ldapConfig)
            {
                if (ldapConfig.Host == "" || ldapConfig.PortValue == "" || ldapConfig.AdminUser == "" || ldapConfig.AdminPass == "" || ldapConfig.LdapSecurityMethod == "")
                {
                    return Task.FromResult(false);
                }
                return Task.FromResult(true);
            }
            public class LdapConfig
            {
                public string Host { get; set; }
                public string PortValue { get; set; }
                public string AdminUser { get; set; }
                public string AdminPass { get; set; }
                public string LdapSecurityMethod { get; set; }
                public string Dn { get; set; }
                public string searchFilter { get; set; }
            }
        }
    }
}