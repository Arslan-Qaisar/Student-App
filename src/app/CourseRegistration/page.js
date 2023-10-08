"use client"
import { useForm, Controller } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function StudentRegistration() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Add the student data to the Firestore "students" collection
      const docRef = await addDoc(collection(db, 'courses'), data);
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
          <h2 className="text-2xl font-bold mb-4 text-center">Course Registration</h2>
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
                Course Code:
              </label>
              <Controller
                name="courseCode"
                control={control}
                defaultValue=""
                rules={{ required: 'Student ID is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="courseCode"
                    className={`border rounded-md p-2 w-full ${
                      errors.courseCode ? 'border-red-500' : 'border-gray-300'
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
                Description:
              </label>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: 'Contact Information is required' }}
                render={({ field }) => (
                  <textarea
                  rows="6"
                    {...field}
                    type="text"
                    id="description"
                    className={`border rounded-md p-2 w-full ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
              />
              {errors.contactInfo && (
                <span className="text-red-500 text-sm mt-1">{errors.contactInfo.message}</span>
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
        <div className=" lg:block lg:w-1/2">
          <img
            src="https://img.freepik.com/premium-photo/boy-is-using-laptop-with-word-s-screen_972034-586.jpg"
            alt="Student Registration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default StudentRegistration;
