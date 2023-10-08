"use client"
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

function StudentsData() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const collectionName = collection(db, 'students');
      const docs = await getDocs(collectionName);
      const studentsData = [];
      docs.forEach((doc) => {
        studentsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching students data:', error);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      const studentDoc = doc(db, 'students', studentId);
      await deleteDoc(studentDoc);
      fetchDocs(); // Refresh the data after deletion
      console.log('Student Data deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleUpdate = async (studentId, updatedData) => {
    try {
      let updatedName = prompt('Enter updated name:', updatedData.name);
      let updatedContact = prompt('Enter updated contact info:', updatedData.contactInfo);
      let updatedStudentId = prompt('Enter updated student ID:', updatedData.studentId);

      const studentDoc = doc(db, 'students', studentId);
      await updateDoc(studentDoc, {
        name: updatedName || updatedData.name, // Use updated value or existing value
        contactInfo: updatedContact || updatedData.contactInfo,
        studentId: updatedStudentId || updatedData.studentId,
      });
      fetchDocs(); // Refresh the data after update
      console.log('Student Data updated successfully');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 ">Student Data</h2>
      <button
        onClick={fetchDocs}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Fetch Data
      </button>
      <Link
        href='/StudentRegistration'
        className="bg-blue-500 ml-6 hover:bg-blue-700 text-white font-bold py-2.5 px-2 rounded mb-4">
        Add a New Student
      </Link>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border-2">
          <thead>
            <tr>
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Contact Information</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{student.studentId}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.contactInfo}</td>
                <td className="border px-4 py-2">{student.course}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleUpdate(student.id, {
                        name: student.name,
                        contactInfo: student.contactInfo,
                        studentId: student.studentId,
                      })
                    }
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsData;
