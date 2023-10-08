"use client"
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

function CourseData() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const collectionName = collection(db, 'courses');
      const docs = await getDocs(collectionName);
      const coursesData = [];
      docs.forEach((doc) => {
        console.log(doc.data());
        coursesData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses data:', error);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const courseDoc = doc(db, 'courses', courseId);
      await deleteDoc(courseDoc);
      fetchDocs(); // Refresh the data after deletion
      console.log('Course Data deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleUpdate = async (courseId, updatedData) => {
    try {
      let updatedName = prompt('Enter updated name:', updatedData.name);
      let updatedDescription = prompt('Enter updated description:', updatedData.description);
      let updatedCode = prompt('Enter updated code:', updatedData.code);

      const courseDoc = doc(db, 'courses', courseId);
      await updateDoc(courseDoc, {
        name: updatedName || updatedData.name, // Use updated value or existing value
        contactInfo: updatedDescription || updatedData.description,
        studentId: updatedCode || updatedData.code,
      });
      fetchDocs(); // Refresh the data after update
      console.log('Course Data updated successfully');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Course Data</h2>
      <button
        onClick={fetchDocs}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Fetch Data
      </button>
      <Link
        href='/CourseRegistration'
        className="bg-blue-500 ml-6 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mb-4"
      >
        Create Course
      </Link>
      <div className="overflow-x-auto">
        <table className="table-auto border">
          <thead>
            <tr>
              <th className="px-4 py-2">Course Code</th>
              <th className="px-4 py-2">Course Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="border px-4 py-2">{course.courseCode}</td>
                <td className="border px-4 py-2">{course.name}</td>
                <td className="border px-4 py-2">{course.description}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleUpdate(course.id, {
                        name: course.name,
                        description: course.description,
                        code: course.code,
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

export default CourseData;
