namespace EntityLayer
{
	public class Result<T>
	{
		// NON-Parameter Constructor Disabled
		private Result()
		{

		}
		/// <summary>
		/// For Successful Results
		/// </summary>
		public Result(T Data)
		{
			this.Data = Data;
			this.isSuccess = true;
			this.Message = "İşlem Başarılı.";
			this.processType = ProcessType.Success;
		}
		/// <summary>
		/// For Unsuccessful Results
		/// </summary>
		public Result(string Message, T Data)
		{
			this.Message = Message;
			this.Data = Data;
			this.isSuccess = false;
			this.processType = ProcessType.Error;
		}
		/// <summary>
		/// For Warning and Infos
		/// </summary>
		public Result(bool isSuccess, string Message, T Data, ProcessType processType)
		{
			this.isSuccess = isSuccess;
			this.Message = Message;
			this.Data = Data;
			this.processType = processType;
		}
		public bool isSuccess { get; set; }
		public string Message { get; set; }
		public T Data { get; set; }
		public ProcessType processType { get; set; }
	}

	public enum ProcessType
	{
		Error = 0,
		Success = 1,
		Warning = 2,
		Info = 3
	}
}
