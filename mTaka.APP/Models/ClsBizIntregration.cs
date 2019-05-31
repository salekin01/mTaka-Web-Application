
using System;
using System.Collections.Generic;

namespace mTaka.APP.Models
{
    [Serializable]
   
    public class ReportConfig
    {
        public ReportConfig()
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

    [Serializable]
   
    public class DatabaseConnectionConfig
    {
        
        public string ConnectionId { get; set; }
      
        public string ConnectionNm { get; set; }
      
        public int ConnDbType { get; set; }
       
        public string ConnDbNm { get; set; }
       
        public string ConnSchemaNm { get; set; }
       
        public string ConnUserId { get; set; }
       
        public string ConnPassWord { get; set; }
       
        public int? DefaultConnFlag { get; set; }
      
        public string MakeBy { get; set; }
        
        public DateTime? MakeDt { get; set; }
    }

}