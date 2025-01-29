# Airline Tracking Service Frontend (React)

## Features
- **Search flights** by flight number, airline, departure, and arrival.
- **Paginate** through flight results.
- **Dynamically update** flight results.

## Technologies Used
- **React.js**
- **Tailwind CSS**
- **Fetch API** for consuming backend API

## Installation
### Prerequisites
- Node.js 16+
- Backend service running

### Setup
1. Navigate to the frontend directory:
   ```sh
   cd airline-tracking-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the `.env` file:
   ```plaintext
   REACT_APP_BACKEND_URL=http://localhost:8080/api/v1
   ```
4. Start the frontend server:
   ```sh
   npm start
   ```

## Usage
1. Open the browser and navigate to `http://localhost:3000`.
2. Enter a flight number, airline, or airport code.
3. Click **Search** to fetch real-time data.
4. Use pagination to navigate results.

---

# Final Notes
- Ensure you have a valid **AviationStack API key**.
- The backend must be running before the frontend can fetch data.
- Future enhancements can include **websocket-based live updates**.

🚀 **Enjoy real-time flight tracking!**

