using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeadSoft.ReportHelper
{
    #region ReportOutputFormat
    /// <summary>
    /// Enum for output format, which are the available output format that the system can print
    /// PDF, MSWord, MSExcel
    /// </summary>
    public enum ReportOutputFormat { PDF = 0, MSWord = 1, MSExcel = 2, Text = 3 }
    #endregion
    #region ReportOutputMedia
    /// <summary>
    /// Enum for output media, which are the available output media that the system can print
    /// Printer, Screen, Email
    /// </summary>
    public enum ReportOutputMedia { Preview = 0, Printer = 1, Export = 2, Email = 3 }
    #endregion
}
