using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ActivitiesFeature;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();

            //this elaborate mapping scheme is explained at ~1:30 here: 
            //https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/learn/lecture/24837060#notes
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername,   
                o => o.MapFrom(
                    s => s.Attendees
                    .FirstOrDefault(x => x.IsHost)
                    .AppUser.UserName));
            CreateMap<ActivityAttendee, AttendeeDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
            .ForMember(i => i.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(i => i.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}