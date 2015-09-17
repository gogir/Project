using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.IO;
using System.ServiceModel;
using System.Text;
using System.Runtime.InteropServices;
using ANYCHATAPI;

namespace XSDAnyChat
{
    [Guid("6B427A86-B889-4E2F-976F-89FB0A538A13")]
    public interface IAnyChat
    {
        //初始化
        [DispId(1)]
        bool Init(int intHandle);

        //连接
        [DispId(2)]
        int AnyChatConnect(string serverAddr, int port);

        //退出
        [DispId(3)]
        int Logout();

        //释放
        [DispId(4)]
        int CRelease();

        //登录
        [DispId(5)]
        int Login(string userName, string password, int passEncType);

        //获取在线好友列表
        [DispId(6)]
        string GetFriends();

        //发起视频呼叫
        [DispId(7)]
        int VideoCallControl(int dwEventType, int dwUserId, int dwErrorCode, int dwFlags, int dwParam, string lpUserStr);

        //进入房间
        [DispId(8)]
        int EnterRoom(int roomid, string roomPass, int passEncType);

        //摄像头控制
        [DispId(9)]
        int UserCameraControl(int userid, bool open);

        //麦克风控制
        [DispId(10)]
        int UserSpeakControl(int userid, bool open);

        //显示摄像头位置
        [DispId(11)]
        int SetVideoPos(int userid, int hWnd, int left, int top, int right, int bottom);

        //离开房间
        [DispId(12)]
        int LeaveRoom(int roomid);

        //获取当前发送的文本消息
        [DispId(13)]
        string GetReceiverMessage();

        //发送消息
        [DispId(14)]
        int SendMessage(string vs_msg);

        //获取远程用户ID
        [DispId(15)]
        int GetRemoteId();

        //拒绝会话
        [DispId(16)]
        int ConversationRefuse();

        //接受会话
        [DispId(17)]
        int ConversationAccept();

        //发送文件
        [DispId(18)]
        int TransFile(string vs_FileName);

        //获取接收到的文件名
        [DispId(19)]
        string GetReceiveFileName();

        //重置参数
        [DispId(20)]
        void Reset();

        //录像
        [DispId(21)]
        int StreamRecordCtrlEx(int userId, bool startRecord);
    }

    [Guid("B2FA4129-6064-4C5F-A093-6795D2BC4AD8"),
        InterfaceType(ComInterfaceType.InterfaceIsIDispatch)]
    public interface COMTestEvents
    {
    }

    [Guid("5A2855E5-CE86-4A69-A420-86C7286F3A44"),
        ClassInterface(ClassInterfaceType.None),
        ComSourceInterfaces(typeof(COMTestEvents)),
    ProgId("XSD.Com.AnyChat")]
    public class AnyChat : IAnyChat
    {
        public const int USERDATA_USERNAME = 1;              ///< 用户姓名
        public const int USERDATA_USERADRESSIP = 2;          ///< 用户地址
        public const int USER_OFFLINE = 0;                  ///< 用户离线                                                  ///
        public const int USER_ONLINE = 1;                   ///< 用户上线

        ComForm lComForm;
        int iCallBackHandle;

        public bool Init(int intHandle)
        {
            iCallBackHandle = intHandle;

            //初始化消息处理窗口
            InitComForm();

            //初始化AnyChat回调窗口
            return SystemSetting.Init(lComForm.Handle);
        }

        public int AnyChatConnect(string serverAddr, int port)
        {
            InitComForm();
            return ANYCHATAPI.AnyChatCoreSDK.Connect(serverAddr, port);
        }

        public int Logout()
        {
            InitComForm();
            return ANYCHATAPI.AnyChatCoreSDK.Logout();
        }

        public int CRelease()
        {
            try
            {
                if (lComForm != null) lComForm.Close();
                return ANYCHATAPI.AnyChatCoreSDK.Release();
            }
            catch (Exception err)
            {
                MessageBox.Show(err.Message);
                return -1;
            }
        }

        public int Login(string userName, string password, int passEncType)
        {
            InitComForm();
            return ANYCHATAPI.AnyChatCoreSDK.Login(userName, password, passEncType);
        }

        private void InitComForm()
        {
            //初始化消息处理窗口
            if (lComForm == null) lComForm = new ComForm();
            lComForm.Show();
            lComForm.Hide();
            lComForm.Init(iCallBackHandle);
        }

        public string GetFriends()
        {
            StringBuilder sb = new StringBuilder();
            int num = 0;
            AnyChatCoreSDK.GetUserFriends(null, ref num);
            int[] friendIds = new int[num];
            AnyChatCoreSDK.GetUserFriends(friendIds, ref num);
            for (int i = 0; i < friendIds.Length; i++)
            {
                int onlineStatus = 0;
                int friendId = friendIds[i];
                AnyChatCoreSDK.GetFriendStatus(friendId, ref onlineStatus);
                if (onlineStatus == USER_OFFLINE)
                {
                    continue;
                }

                StringBuilder friendInfo = new StringBuilder(30);
                int lenth = 30;

                AnyChatCoreSDK.GetUserInfo(friendId, USERDATA_USERNAME, friendInfo, lenth);
                string userName = friendInfo.ToString();

                AnyChatCoreSDK.GetUserInfo(friendId, USERDATA_USERADRESSIP, friendInfo, lenth);
                string userIp = friendInfo.ToString();

                sb.Append(friendId.ToString());
                sb.Append("\t");
                sb.Append(userName);
                sb.Append("\t");
                sb.Append(userIp);
                sb.Append("\r\n");
            }

            return sb.ToString();
        }

        public int VideoCallControl(int dwEventType, int dwUserId, int dwErrorCode, int dwFlags, int dwParam, string lpUserStr)
        {
            InitComForm();
            return lComForm.VideoCallControl(dwEventType, dwUserId, dwErrorCode, dwFlags, dwParam, lpUserStr);
        }

        public int EnterRoom(int roomid, string roomPass, int passEncType)
        {
            InitComForm();
            return AnyChatCoreSDK.EnterRoom(roomid, roomPass, passEncType);
        }

        public int UserCameraControl(int userid, bool open)
        {
            InitComForm();
            return AnyChatCoreSDK.UserCameraControl(userid, open);
        }

        public int UserSpeakControl(int userid, bool open)
        {
            InitComForm();
            return AnyChatCoreSDK.UserSpeakControl(userid, open);
        }

        public int SetVideoPos(int userid, int hWnd, int left, int top, int right, int bottom)
        {
            InitComForm();
            return AnyChatCoreSDK.SetVideoPos(userid,new IntPtr(hWnd),left,top,right,bottom);
        }


        public int LeaveRoom(int roomid)
        {
            InitComForm();
            return AnyChatCoreSDK.LeaveRoom(roomid);
        }


        public string GetReceiverMessage()
        {
            InitComForm();
            return lComForm.GetReceiverMessageText();
        }

        public int SendMessage(string vs_msg)
        {
            InitComForm();
            int length = UnicodeEncoding.Default.GetBytes(vs_msg).Length;
            return AnyChatCoreSDK.SendTextMessage(-1, false, vs_msg, length);
        }

        public int ConversationRefuse()
        {
            InitComForm();
            return lComForm.ConversationRefuse();
        }

        public int ConversationAccept()
        {
            InitComForm();
            return lComForm.ConversationAccept();
        }

        public int TransFile(string vs_FileName)
        {
            InitComForm();
            return lComForm.TransFile(vs_FileName);
        }


        public string GetReceiveFileName()
        {
            InitComForm();
            return lComForm.GetReceiverFileName();
        }


        public void Reset()
        {
            InitComForm();
            lComForm.Reset();
        }


        public int GetRemoteId()
        {
            InitComForm();
            return lComForm.GetRemoteId();
        }


        public int StreamRecordCtrlEx(int userId, bool startRecord)
        {
            InitComForm();
            return lComForm.StreamRecordCtrlEx(userId, startRecord);
        }
    }
}