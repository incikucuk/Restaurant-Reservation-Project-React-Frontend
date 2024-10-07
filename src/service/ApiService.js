import axios from "axios";

export default class ApiService {
  static BASE_URL = "http://localhost:8080";

  static getHeader() {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  /**AUTH */

  /*This register a new user*/
  static async registerUser(registration) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration
    );
    return response.data;
  }

  /*This login a registered user*/
  static async loginUser(loginDetail) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      loginDetail
    );
    return response.data;
  }

  /**USERS */

  /**This is to get the user profile */
  static async getAllUsers() {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-logged-in-profile-info`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getUserProfile() {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-logged-in-profile-info`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getUser(userId) {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-by-id/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getUserBookings(userId) {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-by-bookings/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteUser(userId) {
    const response = await axios.delete(
      `${this.BASE_URL}/users/delete/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**DESK */
  /**This adds a new desk to db */
  static async addDesk(formData) {
    const response = await axios.post(`${this.BASE_URL}/desks/add`, formData, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getAllAvailableDesks() {
    const response = await axios.get(
      `${this.BASE_URL}/desks/all-available-desks`
    );
    return response.data;
  }

  static async getAvailableDesksByDateAndType(
    checkInDate,
    checkOutDate,
    deskType
  ) {
    const response = await axios.get(
      `${this.BASE_URL}/desks/all-available-desks-by-date-and-type?checkInDate=${checkInDate} &checkOutDate=${checkOutDate}
      &deskType=${deskType}`
    );
    return response.data;
  }

  static async getDeskTypes() {
    const response = await axios.get(`${this.BASE_URL}/desks/types`);
    return response.data;
  }

  static async getAllDesks() {
    const response = await axios.get(`${this.BASE_URL}/desks/all`);
    return response.data;
  }

  static async getRoomById(deskId) {
    const response = await axios.get(
      `${this.BASE_URL}/desks/desk-by-id/${deskId}`
    );
    return response.data;
  }

  static async deleteDesk(deskId) {
    const response = await axios.delete(
      `${this.BASE_URL}/desks/delete/${deskId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async updateDesk(deskId, formData) {
    const response = await axios.put(
      `${this.BASE_URL}/desks/update/${deskId}`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  /**BOOKING */
  static async bookDesk(deskId, userId, booking) {
    console.log("USER ID is " + userId);

    const response = await axios.post(
      `${this.BASE_URL}/bookings/book-room/${deskId}/${userId}`,
      booking,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAllBookings() {
    const response = await axios.get(`${this.BASE_URL}/bookings/all`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getBookingByConfirmationCode(bookingCode) {
    const response = await axios.get(
      `${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`
    );
    return response.data;
  }

  static async cancelBooking(bookingId) {
    const response = await axios.delete(
      `${this.BASE_URL}/bookings/cancel/${bookingId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**AUTH-CHECKER */
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role == "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role == "USER";
  }
}
