import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';

const RoomSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [deskType, setDeskType] = useState('');
  const [deskTypes, setDeskTypes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeskTypes = async () => {
      try {
        const types = await ApiService.getDeskTypes();
        setDeskTypes(types);
      } catch (error) {
        console.error('Error fetching desk types:', error.message);
      }
    };
    fetchDeskTypes();
  }, []);

  /**This methods is going to be used to show errors */
  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  /**THis is going to be used to fetch avaailabe desks from database base on seach data that'll be passed in */
  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !deskType) {
      showError('Please select all fields');
      return false;
    }
    try {
      // Convert startDate to the desired format
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
      // Call the API to fetch available desks
      const response = await ApiService.getAvailableDesksByDateAndType(formattedStartDate, formattedEndDate, deskType);

      // Check if the response is successful
      if (response.statusCode === 200) {
        if (response.deskList.length === 0) {
          showError('Desk not currently available for this date range on the selected desk type.');
          return
        }
        handleSearchResult(response.deskList);
        setError('');
      }
    } catch (error) {
      showError("Unown error occured: " + error.response.data.message);
    }
  };

  return (
    <section>
      <div className="search-container">
        <div className="search-field">
          <label>Check-in Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-in Date"
          />
        </div>
        <div className="search-field">
          <label>Check-out Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-out Date"
          />
        </div>

        <div className="search-field">
          <label>Desk Type</label>
          <select value={deskType} onChange={(e) => setDeskType(e.target.value)}>
            <option disabled value="">
              Select Desk Type
            </option>
            {deskTypes.map((deskType) => (
              <option key={deskType} value={deskType}>
                {deskType}
              </option>
            ))}
          </select>
        </div>
        <button className="home-search-button" onClick={handleInternalSearch}>
          Search Rooms
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default RoomSearch;
