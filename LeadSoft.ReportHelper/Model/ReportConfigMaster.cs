
using System;
using System.Collections.Generic;

namespace LeadSoft.ReportHelper
{
    [Serializable]
    public class ReportConfigMaster
    {
        public ReportConfigMaster()
        {
            ReportConfigParams = new List<ReportConfigParam>();
            DatabaseConnection = new DatabaseConnectionConfig();
        }
        
        public string FunctionId { get; set; }
        public string ReportName { get; set; }
        public string ReportFile { get; set; }
        public string AutoGenPeriod { get; set; }
        public int? GenBeforeEod { get; set; }
        public string ConnectionId { get; set; }
        public string MakeBy { get; set; }
        public DateTime? MakeDt { get; set; }
        public int? IsVisible { get; set; }
        public virtual List<ReportConfigParam> ReportConfigParams { get; set; }
        public virtual DatabaseConnectionConfig DatabaseConnection { get; set; }
    }
}
