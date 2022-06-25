using LibreHardwareMonitor.Hardware;

namespace WindowsGateway;

public class UpdateVisitor : IVisitor
{
    private readonly List<IHardware> _hardware = new List<IHardware>();

    public void VisitComputer(IComputer computer)
    {
        computer.Traverse(this);
    }
    public void VisitHardware(IHardware hardware)
    {
        _hardware.Add(hardware);
        hardware.Update();
        foreach (IHardware subHardware in hardware.SubHardware) subHardware.Accept(this);
    }
    public void VisitSensor(ISensor sensor) { }
    public void VisitParameter(IParameter parameter) { }

    public void Update()
    {
        foreach (IHardware hardware in _hardware)
        {
            hardware.Update();
        }
    }
}