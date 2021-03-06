using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using AutoMapper.QueryableExtensions;


namespace Application.ActivitiesFeature
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>>
        {
            
        }
        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                /* NOTE: using .ProjectTo rathen than .Include lets us skip the conversion to a second list
                var activitiesToReturn = _mapper.Map<List<ActivityDto>>(activities);
                return Result<List<ActivityDto>>.Success(activitiesToReturn);
                */
                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}