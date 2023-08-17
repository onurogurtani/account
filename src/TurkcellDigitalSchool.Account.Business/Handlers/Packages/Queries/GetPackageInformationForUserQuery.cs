using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{
    ///<summary>
    ///Get Packages For User list Page
    ///<br />  PageNumber can be  entered manually </remarks>
    [LogScope]
     
    public class GetPackageInformationForUserQuery : IRequest<PackageStatusDto>
    {
        public long UserId { get; set; }
        public class GetPackageInformationForUserQueryHandler : IRequestHandler<GetPackageInformationForUserQuery, PackageStatusDto>
        {
             
            private readonly IMediator _mediator;
            private readonly IPackageRepository _packageRepository;
             
            public GetPackageInformationForUserQueryHandler(IMediator mediator , IPackageRepository packageRepository )
            {
                _mediator = mediator;
                _packageRepository = packageRepository;
            }

            public async Task<PackageStatusDto> Handle(GetPackageInformationForUserQuery request, CancellationToken cancellationToken)
            {
                var userPackages = _mediator.Send(new GetUserPackageListQuery
                {
                    UserId = request.UserId
                }).Result;

                var packageIds = userPackages.Data.Select(s => s.Id).ToList();

                packageIds.AddRange(userPackages.Data.Select(s => s.ParentId).ToList());

                var now = DateTime.Now;
                var userPackageTypes = _packageRepository.Query().Where(w => packageIds.Contains(w.Id) && w.StartDate <= now && w.FinishDate >= now).Select(s => s.PackageTypeEnum).ToList();

                return new PackageStatusDto
                {
                    IsLesson = userPackageTypes.Any(a => a == PackageTypeEnum.Lesson),
                    IsCoachService = userPackageTypes.Any(a => a == PackageTypeEnum.CoachService),
                    IsTestExam = userPackageTypes.Any(a => a == PackageTypeEnum.TestExam),
                    IsMotivationEvent = userPackageTypes.Any(a => a == PackageTypeEnum.MotivationEvent),
                    IsFree = userPackageTypes.Any(a => a == PackageTypeEnum.Free),
                    IsPrivateLesson = userPackageTypes.Any(a => a == PackageTypeEnum.PrivateLesson),
                    IsDemo = userPackageTypes.Any(a => a == PackageTypeEnum.Demo)
                };
            }
        }

    }
}