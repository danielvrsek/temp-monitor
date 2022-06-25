using System.Management;
using System.Linq;
#pragma warning disable CA1416

namespace WindowsGateway.Windows;

public class Win32DiskDriveService
{
    public IEnumerable<Win32DiskDrive> Search()
    {
        ManagementObjectSearcher s = new ManagementObjectSearcher("SELECT * FROM Win32_DiskDrive");
        
        foreach (ManagementObject info in s.Get())
        {
            yield return new Win32DiskDrive
            {
                Model = info["Model"]?.ToString(),
                DeviceId = info["DeviceID"]?.ToString(),
                SerialNumber = info["SerialNumber"]?.ToString()
            };
        }
    }
}
#pragma warning restore CA1416
