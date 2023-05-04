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
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    public class UpdateStudentParentInformationCommand : IRequest<IResult>
    {
        public long UserId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string CitizenId { get; set; }
        public string Email { get; set; }
        public string MobilPhones { get; set; }
        public class UpdateStudentParentInformationCommandHandler : IRequestHandler<UpdateStudentParentInformationCommand, IResult>
        {
            private readonly IStudentParentInformationRepository _studentParentInformationRepository;
            public UpdateStudentParentInformationCommandHandler(IStudentParentInformationRepository studentParentInformationRepository)
            {
                _studentParentInformationRepository = studentParentInformationRepository;
            }


            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
             
            public async Task<IResult> Handle(UpdateStudentParentInformationCommand request, CancellationToken cancellationToken)
            {
                //TODO UserId Tokendan alınacaktır?
                var existStudentParentInfo = _studentParentInformationRepository.Query().FirstOrDefault(w => w.UserId == request.UserId);
                if (existStudentParentInfo == null)
                {
                    var newRecord = new StudentParentInformation
                    {
                        UserId = request.UserId,
                        Name = request.Name,
                        SurName = request.SurName,
                        CitizenId = request.CitizenId,
                        Email = request.Email,
                        MobilPhones = request.MobilPhones,
                    };
                    await _studentParentInformationRepository.CreateAndSaveAsync(newRecord);
                    return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
                }
                existStudentParentInfo.UserId = request.UserId;
                existStudentParentInfo.Name = request.Name;
                existStudentParentInfo.SurName = request.SurName;
                existStudentParentInfo.CitizenId = request.CitizenId;
                existStudentParentInfo.Email = request.Email;
                existStudentParentInfo.MobilPhones = request.MobilPhones;
                await _studentParentInformationRepository.UpdateAndSaveAsync(existStudentParentInfo);
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }

    }
}
