

using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Queries
{
    [ExcludeFromCodeCoverage]
    [LogScope]
    public class GetOperationClaimsQuery : QueryByFilterRequestBase<OperationClaim>
    {
        public class GetOperationClaimsQueryHandler : QueryByFilterRequestHandlerBase<OperationClaim, GetOperationClaimsQuery>
        {
            /// <summary>
            /// Get Operation Claims
            /// </summary>
            public GetOperationClaimsQueryHandler(IOperationClaimRepository repository) : base(repository)
            {
            }


            public override Task<DataResult<PagedList<OperationClaim>>> Handle(GetOperationClaimsQuery request, CancellationToken cancellationToken)
            {
                var result = base.Handle(request, cancellationToken); 
                var ignoreClaims = new List<string>
                {
                    "	EarningsLinkedContentReportForVideoCategoriesDownloadPdf	",
                    "	EarningsLinkedContentReportForVideoCategoriesDownloadExcel	",
                    "	EarningsLinkedContentReportForVideoCategoriesPreview	",
                    "	MyPreferencesReportDownloadPdf	",
                    "	MyPreferencesReportDownloadExcel	",
                    "	FeedbackManagementReportDownloadPdf	",
                    "	FeedbackManagementReportDownloadExcel	",
                    "	FeedbackManagementReportDetail	",
                    "	WorkPlansCompletionReportsDownloadPdf	",
                    "	WorkPlansCompletionReportsDownloadExcel	",
                    "	WorkPlansCompletionReportsDetail	",
                    "	AnnouncementReportDownloadPdf	",
                    "	AnnouncementReportDownloadExcel	",
                    "	UserBasedPracticeExamReportDownloadPdf	",
                    "	UserBasedPracticeExamReportDownloadExcel	",
                    "	ConsolidatedNetNumberReportByTrialTypeDownloadPdf	",
                    "	ConsolidatedNetNumberReportByTrialTypeDownloadExcel	",
                    "	DetailReportBasedOnPracticeExamDownloadPdf	",
                    "	DetailReportBasedOnPracticeExamDownloadExcel	",
                    "	ScoreDistributionReportBasedOnPracticeExamDownloadPdf	",
                    "	ScoreDistributionReportBasedOnPracticeExamDownloadExcel	",
                    "	SolvedQuestionAnalysisDownloadPdf	",
                    "	SolvedQuestionAnalysisDownloadExcel	",
                    "	DifficultyDiscriminationAndDistractionReportDownloadPdf	",
                    "	DifficultyDiscriminationAndDistractionReportDownloadExcel	",
                    "	PackageAndRoleBasedLoginReportPreview	",
                    "	RolesAndUserQuantitiesByPackageShowMenu	"
                };
                result.Result.Data.Items = result.Result.Data.Items.Where(w => !ignoreClaims.Contains(w.Name)).ToList();
                return result;
            }
        }
    }
}