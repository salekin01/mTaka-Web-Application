using System;

namespace LeadSoft.ReportHelper
{
    [Serializable]
    public class ReportConfigParam
    {
        public string FunctionId { get; set; }
        public int SlNo { get; set; }
        public string Parameter { get; set; }
        public string ParameterName { get; set; }
        public string ParameterDatatype { get; set; }
        public string ParameterMaxlength { get; set; }
        public string DefaultValue { get; set; }
        public string ParameterUserAsist { get; set; }
        public int? IsMandatory { get; set; }
        public string ControlType { get; set; }
        public string ListSpName { get; set; }
        public int? IsReadonly { get; set; }
        public int? IsVisible { get; set; }
        public string MinValue { get; set; }
        public string MaxValue { get; set; }
        public string MakeBy { get; set; }
        public DateTime? MakeDt { get; set; }
        public string Value { get; set; }
       
    }

}
