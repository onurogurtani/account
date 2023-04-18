using DocumentFormat.OpenXml.Wordprocessing;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    public class UpdateStudentGuardianInformationCommand : IRequest<IResult>
    {
        public long UserId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public int CitizenId { get; set; }
        public string Email { get; set; }
        public string MobilPhones { get; set; }
        public class UpdateStudentGuardianInformationCommandHandler : IRequestHandler<UpdateStudentGuardianInformationCommand, IResult>
        {
            IStudentGuardianInformationRepository _studentGuardianInformationRepository;
            public UpdateStudentGuardianInformationCommandHandler(IStudentGuardianInformationRepository studentGuardianInformationRepository)
            {
                _studentGuardianInformationRepository = studentGuardianInformationRepository;
            }


            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [ValidationAspect(typeof(UpdateStudentGuardianInformationValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateStudentGuardianInformationCommand request, CancellationToken cancellationToken)
            {
                var existStudentGuardianInfo = _studentGuardianInformationRepository.Query().FirstOrDefault(w => w.UserId == request.UserId);
                if (existStudentGuardianInfo == null)
                {
                    var newRecord = new StudentGuardianInformation
                    {
                        UserId = request.UserId,
                        Name = request.Name,
                        SurName = request.SurName,
                        CitizenId = request.CitizenId,
                        Email = request.Email,
                        MobilPhones = request.MobilPhones,
                    };
                    await _studentGuardianInformationRepository.CreateAndSaveAsync(newRecord);
                    return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
                }
                existStudentGuardianInfo.UserId = request.UserId;
                existStudentGuardianInfo.Name = request.Name;
                existStudentGuardianInfo.SurName = request.SurName;
                existStudentGuardianInfo.CitizenId = request.CitizenId;
                existStudentGuardianInfo.Email = request.Email;
                existStudentGuardianInfo.MobilPhones = request.MobilPhones;
                await _studentGuardianInformationRepository.UpdateAndSaveAsync(existStudentGuardianInfo);
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }

    }
}
