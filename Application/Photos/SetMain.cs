using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
            this._context = context;
            this._userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());
                if (user == null)
                    return Result<Unit>.Failure("User not found");
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo == null)
                    return Result<Unit>.Failure("Photo not found");
                var currentMain = user.Photos.FirstOrDefault(p => p.IsMain);
                if (currentMain != null)
                {
                    currentMain.IsMain = false;
                }
                else
                {
                    return Result<Unit>.Failure("No existing main photo");
                }
                photo.IsMain = true;
                var success = await _context.SaveChangesAsync() > 0;
                if (!success)
                    return Result<Unit>.Failure("Could not update database");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}