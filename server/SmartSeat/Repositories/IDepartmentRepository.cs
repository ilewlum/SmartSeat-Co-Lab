using SmartSeat.Models;
namespace SmartSeat.Repository;

public interface IDepartmentRepository
{
    Task<Department>  GetDepartmentByIdAsync( string departmentId);
    Task<IEnumerable<Department>> GetAllDepartmentsAsync();
    
    Task<Department> CreateAsync(Department department);
    Task<Department> UpdateAsync(string departmentId, Department department);
    Task<bool> DeleteAsync(string departmentId);
}