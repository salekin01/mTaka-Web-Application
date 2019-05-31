using mTaka.Utility;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;

namespace mTaka.APP.Models
{
    [Serializable]
    public class CusCategoryModel
    {
        public string index { get; set; }
        public string CusCategoryId { get; set; }
        public string CusCategoryNm { get; set; }        
      
    }


   
}