using SmartSeat.Models;
namespace SmartSeat.Repository;

public interface IDepartmentRepository
{
    Task<Session>  GetDepartmentByIdAsync( Guid departmentId);
    Task<IEnumerable<Session>> GetAllDepartmentsAsync();
    
    Task<Participant> CreateAsync(Department department);
    Task<Participant> UpdateAsync(Guid departmentId, Department department);
    Task<bool> DeleteAsync(Guid departmentId);
}