using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mTaka.APP.Models
{
    public class UserCredentials
    {
        public string USER_SESSION_ID { get; set; }

        public string APPLICATION_ID { get; set; }

        public string USER_ID { get; set; }

        public string PASSWORD { get; set; }

        public string IP_ADDRESS { get; set; }
    }
}