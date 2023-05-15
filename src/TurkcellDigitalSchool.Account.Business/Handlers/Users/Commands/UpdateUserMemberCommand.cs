using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Org.BouncyCastle.Asn1.Ocsp;
using TurkcellDigitalSchool.Account.Business.Handlers.Users.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    /// <summary>
    /// SetStatus User
    /// </summary>
    public class UpdateUserMemberCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public UserType UserType { get; set; }
        public long CitizenId { get; set; }
        public string BirthPlace { get; set; }
        public DateTime BirthDate { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public string UserName { get; set; }
        public long? ResidenceCityId { get; set; }
        public long? ResidenceCountyId { get; set; }
        public bool ContactBySMS { get; set; }
        public bool ContactByMail { get; set; }
        public bool ContactByCall { get; set; }

        [MessageClassAttr("Üye Düzenle")]
        public class UpdateUserMemberCommandHandler : IRequestHandler<UpdateUserMemberCommand, IResult>
        {
            private readonly IUserRepository _userRepository;

            public UpdateUserMemberCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [SecuredOperation]

            public async Task<IResult> Handle(UpdateUserMemberCommand request, CancellationToken cancellationToken)
            {
                var record = await _userRepository.GetAsync(x => x.Id == request.Id);
                if (record == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                record.UserType = request.UserType;
                record.Name = request.Name;
                record.SurName = request.SurName;
                record.Email = request.Email;
                record.MobilePhones = request.MobilePhones;
                if(await _userRepository.IsPackageBuyer(record.Id))
                {
                    record.CitizenId = request.CitizenId;
                    record.BirthDate = request.BirthDate;
                    record.BirthPlace = request.BirthPlace;
                    record.ResidenceCityId = request.ResidenceCityId;
                    record.ResidenceCountyId = request.ResidenceCountyId;
                    record.UserName = request.UserName;
                    record.ContactBySMS = request.ContactBySMS;
                    record.ContactByMail = request.ContactByMail;
                    record.ContactByCall = request.ContactByCall;
                }
                _userRepository.Update(record);
                await _userRepository.SaveChangesAsync();
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

