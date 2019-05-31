using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mTaka.APP.Common
{
    public class mTakaSession
    {
        #region Private Variables
        private string _CurrentUserId;
        private string _SessionId;
        private string _WalletAccNo;
        private string _SysAccNo;
        private string _BranchId;
        private string _AuthenticationToken;
        private string _LoginAttempts;
        private dynamic _MenuList;
        private string _OldController;
        private string _OldPageName;
        private string _FunctionId;
        #endregion

        #region GET SET
        public string CurrentUserId
        {
            get { return _CurrentUserId; }
            set
            {
                _CurrentUserId = value;
                mTakaSessionContainer = this;
            }
        }
        public string SessionId
        {
            get { return _SessionId; }
            set
            {
                _SessionId = value;
                mTakaSessionContainer = this;
            }
        }
        public string WalletAccNo
        {
            get { return _WalletAccNo; }
            set
            {
                _WalletAccNo = value;
                mTakaSessionContainer = this;
            }
        }
        public string SysAccNo
        {
            get { return _SysAccNo; }
            set
            {
                _SysAccNo = value;
                mTakaSessionContainer = this;
            }
        }
        public string BranchId
        {
            get { return _BranchId; }
            set
            {
                _BranchId = value;
                mTakaSessionContainer = this;
            }
        }
        public string AuthenticationToken
        {
            get { return _AuthenticationToken; }
            set
            {
                _AuthenticationToken = value;
                mTakaSessionContainer = this;
            }
        }
        public string LoginAttempts
        {
            get { return _LoginAttempts; }
            set
            {
                _LoginAttempts = value;
                mTakaSessionContainer = this;
            }
        }
        public dynamic MenuList
        {
            get { return _MenuList; }
            set
            {
                _MenuList = value;
                mTakaSessionContainer = this;
            }
        }
        public string OldController
        {
            get { return _OldController; }
            set
            {
                _OldController = value;
                mTakaSessionContainer = this;
            }
        }
        public string OldPageName
        {
            get { return _OldPageName; }
            set
            {
                _OldPageName = value;
                mTakaSessionContainer = this;
            }
        }
        public string FunctionId
        {
            get { return _FunctionId; }
            set
            {
                _FunctionId = value;
                mTakaSessionContainer = this;
            }
        }
        #endregion

        #region  Session Utility
        public static mTakaSession mTakaSessionContainer
        {
            set
            {
                if (HttpContext.Current.Session != null)
                {
                    HttpContext.Current.Session["MTKSession"] = value;
                }
            }
            get
            {
                if (HttpContext.Current.Session != null)
                {
                    if (HttpContext.Current.Session["MTKSession"] != null)
                    {
                        return (mTakaSession)HttpContext.Current.Session["MTKSession"];
                    }
                    else
                    {
                        return new mTakaSession();
                    }
                }
                else
                    return new mTakaSession();
            }
        }
        #endregion
    }
}