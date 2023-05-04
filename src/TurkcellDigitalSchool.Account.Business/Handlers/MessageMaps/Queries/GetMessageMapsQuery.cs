using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Queries
{
    public class GetMessageMapsQuery : IRequest<IDataResult<PagedList<MessageMapDto>>>
    {
        public MessageMapDetailSearchDto MessageMapDetailSearchDto { get; set; } = new MessageMapDetailSearchDto();

        public class GetMessageMapsQueryHandler : IRequestHandler<GetMessageMapsQuery, IDataResult<PagedList<MessageMapDto>>>
        {
            private readonly IMessageMapRepository _messageMapRepository;

            public GetMessageMapsQueryHandler(IMessageMapRepository messageMapRepository, IMapper mapper, IMediator mediator)
            {
                _messageMapRepository = messageMapRepository;
            }

            public async Task<IDataResult<PagedList<MessageMapDto>>> Handle(GetMessageMapsQuery request, CancellationToken cancellationToken)
            {
                var query = _messageMapRepository.Query().Select(s => new MessageMapDto
                                {
                                 Id = s.Id.ToString(),  
                                 Code = s.Code,
                                 Message = s.UserFriendlyNameOfMessage ?? s.Message,
                                 MessageParameters = s.MessageParameters,
                                 UsedClass = s.UserFriendlyNameOfUsedClass ?? s.DefaultNameOfUsedClass,
                                 OldVersionOfUserFriendlyMessage = s.OldVersionOfUserFriendlyMessage
                                }).AsQueryable();

                request.MessageMapDetailSearchDto.QueryDto.ToList().ForEach(item => {
                    var parameter = Expression.Parameter(typeof(MessageMapDto));
                    var messageMapPropertyValue = Expression.Property(parameter, item.Field);
                    var constainsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                    var contains = Expression.Call(messageMapPropertyValue, constainsMethod, Expression.Constant(item.Text));
                    var whereCondition = (Expression<Func<MessageMapDto, bool>>)Expression.Lambda(contains, parameter);

                    query = query.Where(whereCondition);
                });

                query = request.MessageMapDetailSearchDto.OrderBy switch
                {
                    "CodeASC" => query.OrderBy(x => x.Code),
                    "CodeDESC" => query.OrderByDescending(x => x.Code),
                    "MessageASC" => query.OrderBy(x => x.Message),
                    "MessageDESC" => query.OrderByDescending(x => x.Message),
                    "UsedClassASC" => query.OrderBy(x => x.UsedClass),
                    "UsedClassDESC" => query.OrderByDescending(x => x.UsedClass),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    _ => query.OrderByDescending(x => x.Id),
                };
                var items = await query.Skip((request.MessageMapDetailSearchDto.PageNumber - 1) * request.MessageMapDetailSearchDto.PageSize)
                    .Take(request.MessageMapDetailSearchDto.PageSize)
                    .ToListAsync();

                var pagedList = new PagedList<MessageMapDto>(items, query.Count(), request.MessageMapDetailSearchDto.PageNumber, request.MessageMapDetailSearchDto.PageSize);

                return new SuccessDataResult<PagedList<MessageMapDto>>(pagedList);
            }
        }
    }
}