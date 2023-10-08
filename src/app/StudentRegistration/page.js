"use client"
import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useForm, Controller } from 'react-hook-form';

function StudentRegistration() {
  const [courses, setCourses] = useState([]);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const coursesCollection = collection(db, 'courses');
      const coursesQuery = query(coursesCollection);
      const coursesSnapshot = await getDocs(coursesQuery);

      const coursesData = [];
      coursesSnapshot.forEach((doc) => {
        coursesData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Add the student data to the Firestore "students" collection
      const docRef = await addDoc(collection(db, 'students'), data);
      console.log('Student registration successful. Document ID:', docRef.id);
      // Reset the form
      reset();
    } catch (error) {
      console.error('Error registering student:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl flex justify-center rounded-md shadow-md">
        <div className="bg-white p-6 w-full md:w-2/3 lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-center">Student Registration</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="name"
                    className={`border rounded-md p-2 w-full ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="studentId" className="block text-gray-700 text-sm font-bold mb-2">
                Student CNIC:
              </label>
              <Controller
                name="studentCNIC"
                control={control}
                rules={{ required: 'Student CNIC is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="studentCNIC"
                    className={`border rounded-md p-2 w-full ${
                      errors.studentId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
              />
              {errors.studentId && (
                <span className="text-red-500 text-sm mt-1">{errors.studentId.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="contactInfo" className="block text-gray-700 text-sm font-bold mb-2">
                Contact Information:
              </label>
              <Controller
                name="contactInfo"
                control={control}
                defaultValue=""
                rules={{ required: 'Contact Information is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="contactInfo"
                    className={`border rounded-md p-2 w-full ${
                      errors.contactInfo ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
              />
              {errors.contactInfo && (
                <span className="text-red-500 text-sm mt-1">{errors.contactInfo.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="course" className="block text-gray-700 text-sm font-bold mb-2">
                Select Course:
              </label>
              <Controller
                name="course"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    id="course"
                    className={`border rounded-md p-2 w-full ${
                      errors.course ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="" disabled>
                      Available Courses
                    </option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.course && (
                <span className="text-red-500 text-sm mt-1">{errors.course.message}</span>
              )}
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="lg:block lg:w-1/2">
          <img
            src="https://codeandhack.b-cdn.net/wp-content/uploads/2023/07/pseudo-code-coding-skills-ws-theme.jpg"
            alt="Student Registration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default StudentRegistration;
