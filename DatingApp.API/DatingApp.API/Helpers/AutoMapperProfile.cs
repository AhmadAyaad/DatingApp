using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, options =>
                 {
                     options.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                 })
                .ForMember(dest => dest.Age, options =>
                  {
                      options.MapFrom(src => src.DateOfBirth.CalaculateAge());
                  });
            CreateMap<User, UserForDetailsDto>()
                .ForMember(dest => dest.PhotoUrl, options =>
                 {
                     options.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                 })
                .ForMember(dest => dest.Age, options =>
                 {
                     options.MapFrom(src => src.DateOfBirth.CalaculateAge());
                 });
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoToReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();

        }
    }
}
