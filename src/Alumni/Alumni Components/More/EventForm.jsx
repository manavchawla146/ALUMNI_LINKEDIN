import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, updateDoc, getFirestore } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { app } from '../../../firebase';

const db = getFirestore(app);
const storage = getStorage(app);

const EventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    registrationClosingDate: '',
    location: '',
    description: '',
    eventDetails: null,
    imageUrl: null,
    eventName: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageRef = ref(storage, `events/images/${formData.imageUrl.name}`);
      await uploadBytes(imageRef, formData.imageUrl);
      const imageUrl = await getDownloadURL(imageRef);

      const pdfRef = ref(storage, `events/pdfs/${formData.eventDetails.name}`);
      await uploadBytes(pdfRef, formData.eventDetails);
      const pdfUrl = await getDownloadURL(pdfRef);

      const docRef = await addDoc(collection(db, 'events'), {
        eventName: formData.eventName,
        registrationClosingDate: formData.registrationClosingDate,
        location: formData.location,
        description: formData.description,
        pending: true,
        imageUrl,
        pdfUrl,
      });

      await updateDoc(docRef, { id: docRef.id });
      navigate('/');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Event Details</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="eventName" className="text-lg font-medium mb-2">Event Name:</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="registrationClosingDate" className="text-lg font-medium mb-2"> Date:</label>
            <input
              type="date"
              id="registrationClosingDate"
              name="registrationClosingDate"
              value={formData.registrationClosingDate}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          
            <div className="flex flex-col">
              <label htmlFor="location" className="text-lg font-medium mb-2">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
            </div>
          
          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-medium mb-2">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded h-32"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="eventDetails" className="text-lg font-medium mb-2">Event Details PDF:</label>
            <input
              type="file"
              id="eventDetails"
              name="eventDetails"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="text-lg font-medium mb-2">Event Image:</label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              accept="image/*"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;