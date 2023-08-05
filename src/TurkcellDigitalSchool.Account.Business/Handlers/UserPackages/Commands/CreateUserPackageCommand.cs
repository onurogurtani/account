using MediatR;
using System.Threading.Tasks;
using System.Threading;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using DotNetCore.CAP;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.SubServiceConst;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Commands
{
    public class CreateUserPackageCommand : IRequest<IResult>
    {
        public UserPackage Entity { get; set; }

        [MessageClassAttr("Kullanıcı-Paket Ekleme")]
        public class CreateUserPackageCommandHandler : IRequestHandler<CreateUserPackageCommand, IResult>
        {
            private readonly IUserPackageRepository _userPackageRepository;
            private readonly ICapPublisher _capPublisher;

            public CreateUserPackageCommandHandler(IUserPackageRepository userPackageRepository, ICapPublisher capPublisher)
            {
                _userPackageRepository = userPackageRepository;
                _capPublisher = capPublisher;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(CreateUserPackageCommand request, CancellationToken cancellationToken)
            {
                var record = _userPackageRepository.Add(request.Entity);
                var value = await _userPackageRepository.SaveChangesAsync();

                if (value > 0)
                {
                    var examKind = await _userPackageRepository.Query().Where(x => x.PackageId == record.PackageId).Select(x => x.Package.ExamKind).FirstOrDefaultAsync();
                    if (examKind == ExamKind.LGS)
                    {
                        await _capPublisher.PublishAsync(SubServiceConst.ADD_USERLGSNETGOAL_REQUEST, new AddUserLgsNetGoalDto { UserId = record.UserId }, cancellationToken: cancellationToken);
                    }
                    else if (examKind == ExamKind.TYT || examKind == ExamKind.AYT || examKind == ExamKind.YKS)
                    {
                        await _capPublisher.PublishAsync(SubServiceConst.ADD_USERYKSNETGOAL_REQUEST, new AddUserYksNetGoalDto { UserId = record.UserId, ExamKind = examKind }, cancellationToken: cancellationToken);
                    }
                }
                return new SuccessDataResult<UserPackage>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
