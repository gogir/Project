using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using ANYCHATAPI;
using System.Windows.Forms;
using VideoChatHelp;
using System.Runtime.InteropServices;
using System.IO;

namespace XSDAnyChat
{
    public partial class ComForm : Form
    {
        [DllImport("User32.dll", EntryPoint = "FindWindow")]
        private static extern IntPtr FindWindow(string lpClassName, string lpWindowName);

        [DllImport("User32.dll", EntryPoint = "SendMessage")]
        private static extern int SendMessage(IntPtr hWnd, int msg, uint wParam, uint lParam);

        public const int AC_ERROR_VIDEOCALL_REJECT = 100104;       ///< 目标用户拒绝会话
        ///
        public const int XMSG_VideoCall_Reply_Handler = 1024 - 1 + 75;
        public const int XMSG_VIDEOCALL_EVENT_START = 1024 - 1 + 74;
        public const int XMSG_VIDEOCALL_EVENT_FINISH = 1024 - 1 + 73;
        public const int XMSG_Text_OnReceive = 1024 - 1 + 72;
        public const int XMSG_VideoCall_Request_Handler = 1024 - 1 + 71;
        public const int XMSG_File_OnReceive = 1024 - 1 + 70;
        public const int XMSG_Record_OnReceive = 1024 - 1 + 69;
        public const int XMSG_Buffer_OnReceive = 1024 - 1 + 68;

        private string is_ReceiverMessageText = string.Empty;

        private int ii_LocalUserId = 0;                               //本地用户ID
        private int ii_RemoteUserId = 0;                              //远程用户ID
        private int ii_RoomId = 0;                                   //当前房间ID
        private string is_FileName = string.Empty;
        private string is_Buffer = string.Empty;

        private IntPtr CallBackHandle;

        public ComForm()
        {
            InitializeComponent();
        }

        //绑定回调事件处理方法
        public void Init(int iCallBackHandle)
        {
            CallBackHandle = new IntPtr(iCallBackHandle);
            SystemSetting.Text_OnReceive = new TextReceivedHandler(Received_Text);

            string path = Application.StartupPath;
            SystemSetting.TransFile_Received = new TransFileReceivedHandler(Received_TransFile);        //设置文件接受回调函数
            SystemSetting.SetRecordReceivedCallBack = new SetRecordReceivedHandler(Record_Received);     //设置录像结束回调函数
            SystemSetting.TransBuffer_OnReceive = new TransBufferReceivedHandler(TransBuffer_CallBack);

            AnyChatCoreSDK.SetSDKOption(AnyChatCoreSDK.BRAC_SO_CORESDK_PATH, path, path.Length);
        }

        //文本消息接收回调
        void Received_Text(int fromUID, int toUID, string Text, bool isserect)
        {
            //ii_fromUID = fromUID;
            //ii_toUID = toUID;
            is_ReceiverMessageText = Text;
            SendMessage(CallBackHandle, XMSG_Text_OnReceive, 0, 0);
        }

        //文件接收回调
        void Received_TransFile(int userId, string fileName, string filePath, int fileLength, int wParam, int lParam, int taskId, int userValue)
        {
            is_FileName = fileName;
            WriteLog("Received_TransFile:" + fileName + ",userId:" + userId.ToString());
            SendMessage(CallBackHandle, XMSG_File_OnReceive, 0, 0);
        }

        //录像接收回调
        void Record_Received(int userId, string filePath, int param, bool recordType, int userValue)
        {
            is_FileName = filePath;
            WriteLog("Record_Received:" + filePath + ",userId:" + userId.ToString());
            SendMessage(CallBackHandle, XMSG_File_OnReceive, 0, 0);
        }

        //消息处理，直接返回
        protected override void WndProc(ref Message m)
        {
            switch (m.Msg)
            {
                case AnyChatCoreSDK.WM_GV_CONNECT:
                case AnyChatCoreSDK.WM_GV_LOGINSYSTEM:
                    if (m.LParam.ToInt32() == 0)
                    {
                        ii_LocalUserId = m.WParam.ToInt32();//保存当前ID
                    }

                    SendMessage(CallBackHandle, m.Msg - 200, (uint)m.WParam.ToInt32(), (uint)m.LParam.ToInt32());
                    break;
                case AnyChatCoreSDK.WM_GV_ENTERROOM:
                case AnyChatCoreSDK.WM_GV_ONLINEUSER:
                case AnyChatCoreSDK.WM_GV_USERATROOM:
                case AnyChatCoreSDK.WM_GV_CAMERASTATE:
                case AnyChatCoreSDK.WM_GV_LINKCLOSE:
                case AnyChatCoreSDK.WM_GV_FRIENDSTATUS:
                case AnyChatCoreSDK.WM_GV_USERINFOUPDATE:
                    SendMessage(CallBackHandle, m.Msg - 200, (uint)m.WParam.ToInt32(), (uint)m.LParam.ToInt32());
                    break;
                default:
                    base.WndProc(ref m);
                    break;
            }
        }


        private void VideoCallEvent_CallBack(int dwEventType, int dwUserId, int dwErrorCode, int dwFlags, int dwParam, string lpUserStr)
        {
            switch (dwEventType)
            {
                //呼叫请求事件
                case AnyChatCoreSDK.BRAC_VIDEOCALL_EVENT_REQUEST:
                    VideoCall_Request_Handler(dwUserId, dwParam, lpUserStr);
                    break;
                //呼叫回复事件
                case AnyChatCoreSDK.BRAC_VIDEOCALL_EVENT_REPLY:
                    VideoCall_Reply_Handler(dwUserId, dwErrorCode, dwParam, lpUserStr);
                    break;
                //呼叫开始事件
                case AnyChatCoreSDK.BRAC_VIDEOCALL_EVENT_START:
                    ii_RoomId = dwParam;
                    if (dwParam >= 0)
                        SendMessage(CallBackHandle, XMSG_VIDEOCALL_EVENT_START, (uint)dwParam, 0);
                    else
                        SendMessage(CallBackHandle, XMSG_VIDEOCALL_EVENT_START, 0, (uint)(dwParam * -1));
                    break;
                //呼叫结束事件
                case AnyChatCoreSDK.BRAC_VIDEOCALL_EVENT_FINISH:
                    SendMessage(CallBackHandle, XMSG_VIDEOCALL_EVENT_FINISH, 0, 0);
                    break;
            }
        }

        //接收到视频呼叫请求处理
        private void VideoCall_Request_Handler(int dwUserId, int dwParam, string lpUserStr)
        {
            ii_RemoteUserId = dwUserId;
            //发送会话请求消息
            SendMessage(CallBackHandle, XMSG_VideoCall_Request_Handler, 0, 0);
        }

        private void ComForm_Load(object sender, EventArgs e)
        {
            this.Hide();
            SystemSetting.VideoCallEvent_Handler = new SystemSetting.VideoCallEventCallBack(VideoCallEvent_CallBack);
        }

        //视频呼叫回复
        private void VideoCall_Reply_Handler(int userId, int dwErrorCode, int wParam, string lpStr)
        {
            //直接返回消息给来源窗口
            SendMessage(CallBackHandle, XMSG_VideoCall_Reply_Handler, (uint)userId, (uint)dwErrorCode);
            Log.SetLog("VideoCall_Reply_Handler" + dwErrorCode);
        }

        public string GetReceiverMessageText()
        {
            return is_ReceiverMessageText;
        }

        //拒绝会话
        public int ConversationRefuse()
        {
            return AnyChatCoreSDK.VideoCallControl(AnyChatCoreSDK.BRAC_VIDEOCALL_EVENT_REPLY, ii_RemoteUserId, AC_ERROR_VIDEOCALL_REJECT, 0, 0, "");
        }

        //同意会话
        public int ConversationAccept()
        {
            return AnyChatCoreSDK.VideoCallControl(AnyChatCoreSDK.BRAC_VIDEOCALL_EVENT_REPLY, ii_RemoteUserId, 0, 0, 0, "");
        }

        //发送文件
        public int TransFile(string vs_FileName)
        {
            int taskId = 0;
            WriteLog("TransFile:" + vs_FileName + ",ii_RemoteId:" + ii_RemoteUserId.ToString());
            return AnyChatCoreSDK.TransFile(ii_RemoteUserId, vs_FileName, 1, 0, 0, ref taskId);
        }

        //获取接受的文件名
        public string GetReceiverFileName()
        {
            return is_FileName;
        }

        //记录日志
        public void WriteLog(string ls_Msg)
        {
            string ls_file = @"XSDAnyChatLog.txt";
            if (File.Exists(ls_file))
            {
                FileInfo fi = new FileInfo(ls_file);
                if (fi.Length > 1024 * 5) File.Delete(ls_file);
            }

            ls_Msg = DateTime.Now.ToString() + "    " + ls_Msg;
            FileStream fs = new FileStream(ls_file, FileMode.OpenOrCreate, FileAccess.Write, FileShare.Write);
            fs.Close();
            StreamWriter sw = new StreamWriter(ls_file, true, Encoding.UTF8);
            sw.WriteLine(ls_Msg);
            sw.Close();
        }

        public int VideoCallControl(int dwEventType, int dwUserId, int dwErrorCode, int dwFlags, int dwParam, string lpUserStr)
        {
            ii_RemoteUserId = dwUserId;
            //WriteLog("VideoCallControl:ii_RemoteId = " + ii_RemoteUserId.ToString());
            //WriteLog("VideoCallControl:ii_LocalUserId = " + ii_LocalUserId.ToString());
            return AnyChatCoreSDK.VideoCallControl(dwEventType, dwUserId, dwErrorCode, dwFlags, dwParam, lpUserStr);
        }

        public void Reset()
        {
            ii_LocalUserId = 0;
            ii_RemoteUserId = 0;
            ii_RoomId = 0;
            is_FileName = string.Empty;
        }
        
        public int GetRemoteId()
        {
            return ii_RemoteUserId;
        }

        //视频录像
        public int StreamRecordCtrlEx(int userId, bool startRecord)
        {
            return AnyChatCoreSDK.StreamRecordCtrlEx(userId, startRecord, AnyChatCoreSDK.ANYCHAT_RECORD_FLAGS_ABREAST, 0, "");
        }

        //通过透明通道传递参数
        public int TransMessage(int userId, string vs_msg)
        {
            byte[] bs = Encoding.Default.GetBytes(vs_msg);
            return AnyChatCoreSDK.TransBuffer(userId, bs, bs.Length);
        }

        //返回透明通道获取的数据
        public string GetBuffer()
        {
            return is_Buffer;
        }

        //透明通道回调函数
        public void TransBuffer_CallBack(int userId, IntPtr buf, int len, int userValue)
        {
            try
            {
                is_Buffer = Marshal.PtrToStringAnsi(buf);
                SendMessage(CallBackHandle, XMSG_Buffer_OnReceive, 0, 0);
            }
            catch (Exception err)
            {
                WriteLog("TransBuffer_CallBack:" + err.Message);
            }
        }
    }
}
