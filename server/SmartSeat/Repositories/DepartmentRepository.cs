using Google.Cloud.Firestore;
using SmartSeat.Models;
using SmartSeat.Repositories;
using SmartSeat.Repository;

namespace SmartSeat.Repositories;

public class DepartmentRepository : IDepartmentRepository
{
    private readonly FirestoreDb _firestoreDb;
    private const string Collection = "departments";

    public DepartmentRepository(FirestoreDb db)
    {
        _firestoreDb = db;
    }

    public async Task<Department> GetDepartmentByIdAsync(string departmentId)
    {
        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(departmentId);

        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
            throw new KeyNotFoundException($"Department '{departmentId}' not found.");

        return snapshot.ConvertTo<Department>();
    }

    public async Task<IEnumerable<Department>> GetAllDepartmentsAsync()
    {
        QuerySnapshot snapshot = await _firestoreDb
            .Collection(Collection)
            .GetSnapshotAsync();

        return snapshot.Documents
            .Where(d => d.Exists)
            .Select(d => d.ConvertTo<Department>());
    }

    public async Task<Department> CreateAsync(Department department)
    {
        if (string.IsNullOrEmpty(department.DepartmentId))
            department.DepartmentId = Guid.NewGuid().ToString();

        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(department.DepartmentId);

        await docRef.SetAsync(department);

        return department;
    }

    public async Task<Department> UpdateAsync(string departmentId, Department department)
    {
        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(departmentId);

        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
            throw new KeyNotFoundException($"Department '{departmentId}' not found.");

        department.DepartmentId = departmentId;
        await docRef.SetAsync(department, SetOptions.Overwrite);

        return department;
    }

    public async Task<bool> DeleteAsync(string departmentId)
    {
        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(departmentId);

        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
            return false;

        await docRef.DeleteAsync();
        return true;
    }
}