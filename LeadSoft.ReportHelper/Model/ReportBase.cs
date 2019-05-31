using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeadSoft.ReportHelper
{
    [Serializable]
    public class ReportBase
    {
        public string ReportServerpath { get; set; }
        public string DBServerName { get; set; }
        public string DBName { get; set; }
        public string DBUserId { get; set; }
        public string DBPassword { get; set; }
        public string ExportFilePath { get; set; }
        public string MailSenderName { get; set; }
        public string MailSenderAddress { get; set; }
        public string MailServerIP { get; set; }
        public string ESFileName { get; set; }
        public string ReportPassword { get; set; }
        public string ReportName { get; set; }
        public ArrayList ReportParameterList { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
        public string BranchId { get; set; }
    }
}
