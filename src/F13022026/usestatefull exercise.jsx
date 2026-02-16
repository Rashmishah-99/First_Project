       {/* show a list of students with their names, ids, average grade.
       
       each student should display name, student id, average grade, grade letter(a,b,c,d,e) Allow the user to add new students, update existing student information, and delete students from the list. */}
// import React, { useState } from "react";

// export default function StudentGradeManagement(){
//     const [studentId, setStudentId] = useState("");
//     const [name, setName] = useState("");
//     const [average, setAverage] = useState("");
//     const [students, setStudents] = useState([]);

//     const computeLetter = (avg) => {
//         const n = parseFloat(avg);
//         if (isNaN(n)) return "";
//         if (n >= 90) return "A";
//         if (n >= 80) return "B";
//         if (n >= 70) return "C";
//         if (n >= 60) return "D";
//         return "E";
//     };

//     const clearForm = () => {
//         setStudentId("");
//         setName("");
//         setAverage("");
//     };

//     const handleAdd = () => {
//         if (!studentId || !name) return;
//         if (students.find(s => s.id === studentId)) {
//             alert("Student with this ID already exists");
//             return;
//         }
//         setStudents([...students, { id: studentId, name, average }]);
//         clearForm();
//     };

//     const handleUpdate = () => {
//         setStudents(students.map(s =>
//             s.id === studentId ? { ...s, name, average } : s
//         ));
//         clearForm();
//     };

//     const handleDelete = () => {
//         setStudents(students.filter(s => s.id !== studentId));
//         clearForm();
//     };

//     const handleSelect = (s) => {
//         setStudentId(s.id);
//         setName(s.name);
//         setAverage(s.average);
//     };

//     return(
//         <>
//         <h1>Student Grade Management</h1>
//         <div>
//             <input
//                 type="text"
//                 placeholder="Student Id"
//                 value={studentId}
//                 onChange={e => setStudentId(e.target.value)}
//             />
//             <br/><br/>
//             <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//             />
//             <br/><br/>
//             <input
//                 type="text"
//                 placeholder="Average"
//                 value={average}
//                 onChange={e => setAverage(e.target.value)}
//             />
//             <br/><br/>
//             <button onClick={handleAdd}>Add Student</button>

//             <button onClick={handleUpdate} style={{ marginLeft: 10 }}>Update Student</button>
//             <button onClick={handleDelete} style={{ marginLeft: 10 }}>Delete Student</button>
//         </div>
//         <br/>
//         <h2>Students List</h2>
//         <ul>
//             {students.map(s => (
//                 <li
//                     key={s.id}
//                     onClick={() => handleSelect(s)}
//                     style={{ cursor: 'pointer', marginBottom: 8 }}
//                 >
//                     <strong>{s.name}</strong> (ID: {s.id}) - Avg: {s.average} - Grade: {computeLetter(s.average)}
//                 </li>
//             ))}
//         </ul>
        
//         </>
//     )
// }



import React, { useState } from 'react';
import './Student.css';

const StudentGradeManagement = () => {
  // ---------- State ----------
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice', math: 85, science: 92, english: 78 },
    { id: 2, name: 'Bob', math: 72, science: 68, english: 74 },
    { id: 3, name: 'Charlie', math: 95, science: 88, english: 91 },
    { id: 4, name: 'Diana', math: 63, science: 71, english: 59 },
  ]);

  // Form fields for new student
  const [newName, setNewName] = useState('');
  const [newMath, setNewMath] = useState('');
  const [newScience, setNewScience] = useState('');
  const [newEnglish, setNewEnglish] = useState('');

  // Filter & sort
  const [filterName, setFilterName] = useState('');
  const [sortOrder, setSortOrder] = useState('A-Z');

  // ---------- Helper functions ----------
  const calculateAverage = (math, science, english) =>
    ((math + science + english) / 3).toFixed(2);

  const getLetterGrade = (avg) => {
    if (avg >= 90) return 'A';
    if (avg >= 80) return 'B';
    if (avg >= 70) return 'C';
    if (avg >= 60) return 'D';
    return 'F';
  };

  const getLetterColor = (letter) => {
    const colors = {
      A: '#4caf50',
      B: '#2196f3',
      C: '#ff9800',
      D: '#f44336',
      F: '#9c27b0'
    };
    return colors[letter] || '#666';
  };

  // ---------- Handlers ----------
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const math = parseInt(newMath);
    const science = parseInt(newScience);
    const english = parseInt(newEnglish);
    if (isNaN(math) || isNaN(science) || isNaN(english)) return;

    const newStudent = {
      id: Date.now(),
      name: newName.trim(),
      math,
      science,
      english,
    };
    setStudents([...students, newStudent]);
    setNewName('');
    setNewMath('');
    setNewScience('');
    setNewEnglish('');
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleGradeUpdate = (id, subject, value) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 0 || num > 100) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [subject]: num } : s))
    );
  };

  // ---------- Derived data for stats ----------
  const allAverages = students.map((s) =>
    parseFloat(calculateAverage(s.math, s.science, s.english))
  );

  const classAverage =
    students.length > 0
      ? (allAverages.reduce((acc, val) => acc + val, 0) / students.length).toFixed(2)
      : 0;

  const highestGrade =
    students.length > 0 ? Math.max(...allAverages).toFixed(2) : '—';
  const lowestGrade =
    students.length > 0 ? Math.min(...allAverages).toFixed(2) : '—';

  const letterCounts = students.reduce(
    (acc, s) => {
      const avg = parseFloat(calculateAverage(s.math, s.science, s.english));
      const letter = getLetterGrade(avg);
      acc[letter] = (acc[letter] || 0) + 1;
      return acc;
    },
    { A: 0, B: 0, C: 0, D: 0, F: 0 }
  );

  // ---------- Filter & sort students ----------
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'A-Z') return a.name.localeCompare(b.name);
    else return b.name.localeCompare(a.name);
  });

  return (
    <div className="sgm-container">
      <header className="sgm-header">
        <h1>📚 Student Grade Management System</h1>
        <p className="sgm-subtitle">Easily manage and track student performance</p>
      </header>

      {/* Add Student Form */}
      <section className="sgm-card">
        <h2 className="sgm-card-title">➕ Add New Student</h2>
        <form onSubmit={handleAddStudent} className="sgm-form">
          <div className="sgm-form-group">
            <label htmlFor="name">Student Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g., John Doe"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </div>
          
          <div className="sgm-form-row">
            <div className="sgm-form-group">
              <label htmlFor="math">Mathematics</label>
              <input
                id="math"
                type="number"
                placeholder="0-100"
                value={newMath}
                onChange={(e) => setNewMath(e.target.value)}
                min="0"
                max="100"
                required
              />
            </div>
            
            <div className="sgm-form-group">
              <label htmlFor="science">Science</label>
              <input
                id="science"
                type="number"
                placeholder="0-100"
                value={newScience}
                onChange={(e) => setNewScience(e.target.value)}
                min="0"
                max="100"
                required
              />
            </div>
            
            <div className="sgm-form-group">
              <label htmlFor="english">English</label>
              <input
                id="english"
                type="number"
                placeholder="0-100"
                value={newEnglish}
                onChange={(e) => setNewEnglish(e.target.value)}
                min="0"
                max="100"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="sgm-btn sgm-btn-primary">
            Add Student
          </button>
        </form>
      </section>

      {/* Statistics Panel */}
      <section className="sgm-stats">
        <div className="sgm-stat-card">
          <div className="sgm-stat-icon">📊</div>
          <div className="sgm-stat-content">
            <span className="sgm-stat-label">Class Average</span>
            <span className="sgm-stat-value">{classAverage}%</span>
          </div>
        </div>
        
        <div className="sgm-stat-card">
          <div className="sgm-stat-icon">⬆️</div>
          <div className="sgm-stat-content">
            <span className="sgm-stat-label">Highest Average</span>
            <span className="sgm-stat-value">{highestGrade}%</span>
          </div>
        </div>
        
        <div className="sgm-stat-card">
          <div className="sgm-stat-icon">⬇️</div>
          <div className="sgm-stat-content">
            <span className="sgm-stat-label">Lowest Average</span>
            <span className="sgm-stat-value">{lowestGrade}%</span>
          </div>
        </div>
      </section>

      {/* Letter Grade Distribution */}
      <section className="sgm-grade-distribution">
        <h3>Letter Grade Distribution</h3>
        <div className="sgm-grade-bars">
          {Object.entries(letterCounts).map(([letter, count]) => (
            <div key={letter} className="sgm-grade-item">
              <div className="sgm-grade-bar-container">
                <div 
                  className="sgm-grade-bar"
                  style={{ 
                    width: `${(count / students.length) * 100}%`,
                    backgroundColor: getLetterColor(letter)
                  }}
                ></div>
              </div>
              <span className="sgm-grade-label">
                {letter}: {count} student{count !== 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter & Sort Controls */}
      <section className="sgm-controls">
        <div className="sgm-filter">
          <label htmlFor="filter">🔍 Filter by name</label>
          <input
            id="filter"
            type="text"
            placeholder="Search students..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
        
        <div className="sgm-sort">
          <label htmlFor="sort">Sort by name</label>
          <select 
            id="sort"
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="A-Z">A to Z</option>
            <option value="Z-A">Z to A</option>
          </select>
        </div>
      </section>

      {/* Student List */}
      <section className="sgm-student-list">
        <h3>Student Records</h3>
        {sorted.length === 0 ? (
          <p className="sgm-no-results">No students match your search criteria.</p>
        ) : (
          <div className="sgm-table-container">
            <table className="sgm-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Math</th>
                  <th>Science</th>
                  <th>English</th>
                  <th>Average</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((s) => {
                  const avg = calculateAverage(s.math, s.science, s.english);
                  const letter = getLetterGrade(parseFloat(avg));
                  return (
                    <tr key={s.id}>
                      <td className="sgm-id">#{s.id}</td>
                      <td className="sgm-name">{s.name}</td>
                      <td>
                        <input
                          type="number"
                          defaultValue={s.math}
                          onBlur={(e) => handleGradeUpdate(s.id, 'math', e.target.value)}
                          min="0"
                          max="100"
                          className="sgm-grade-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          defaultValue={s.science}
                          onBlur={(e) => handleGradeUpdate(s.id, 'science', e.target.value)}
                          min="0"
                          max="100"
                          className="sgm-grade-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          defaultValue={s.english}
                          onBlur={(e) => handleGradeUpdate(s.id, 'english', e.target.value)}
                          min="0"
                          max="100"
                          className="sgm-grade-input"
                        />
                      </td>
                      <td className="sgm-average">{avg}%</td>
                      <td>
                        <span 
                          className="sgm-letter-grade"
                          style={{ backgroundColor: getLetterColor(letter) }}
                        >
                          {letter}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => handleDelete(s.id)}
                          className="sgm-btn sgm-btn-delete"
                          title="Delete student"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentGradeManagement;