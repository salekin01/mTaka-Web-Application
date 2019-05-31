using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeadSoft.ReportHelper
{
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
