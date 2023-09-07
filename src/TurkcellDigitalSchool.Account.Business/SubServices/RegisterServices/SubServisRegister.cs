using Microsoft.Extensions.DependencyInjection;

namespace TurkcellDigitalSchool.Account.Business.SubServices.RegisterServices
{
    public static class SubServisRegister
    {
        public static void AddSubServices(this IServiceCollection services)
        {
            services.AddTransient<OperationCliamCreateRequestServices>();
            services.AddTransient<BranchMainFieldEntitySubServices>();
            services.AddTransient<ClassroomEntitySubServices>();
            services.AddTransient<EducationYearEntitySubService>();
            services.AddTransient<EventEntitySubServices>();
            services.AddTransient<FileEntitySubServices>();
            services.AddTransient<PublisherEntitySubServices>();
            services.AddTransient<LessonEntitySubServices>();
            services.AddTransient<TestExamEntitySubServices>();
            services.AddTransient<TestExamTypeEntitySubServices>();
            services.AddTransient<EYDataTransferMapEntitySubServices>();
            services.AddTransient<CreateMessageMapRequestServices>();
            services.AddTransient<UserSearchHistorySubService>();
        }
    }
}
