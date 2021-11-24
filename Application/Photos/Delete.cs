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
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Hander : IRequestHandler<Command, Result<Unit>>
        {
        private readonly IUserAccessor _userAccessor;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly DataContext _context;
            public Hander(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
            this._context = context;
            this._photoAccessor = photoAccessor;
            this._userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                .Include(u => u.Photos)
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());
                if (user == null) return null;
                var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);
                if (photo == null) return null;
                if (photo.IsMain) return Result<Unit>.Failure("Cannot delete main photo");
                var success = await _photoAccessor.DeletePhoto(photo.Id);
                if (success == null)
                    return Result<Unit>.Failure("Could not delete photo");
                user.Photos.Remove(photo);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result)
                    return Result<Unit>.Failure("Could not update database");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}