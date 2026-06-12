# Bus Seat Booking App

A React Native mobile application for booking bus seats.
This project was built as a technical test for the **Intern React Native Developer** position.

The app allows users to choose a bus class, select a departure date, pick available seats, calculate the total price, confirm bookings, and view sales history.

---

## APK Download

The APK file can be downloaded from the Google Drive folder below:

https://drive.google.com/drive/folders/1oyBZ-qP9ZN507B78yh1XyIOBi5eWiidK?usp=sharing

---

## Demo Video

YouTube Demo: [`YOUTUBE_DEMO_LINK`](https://youtube.com/shorts/CXh3Eql-5zU)

---

## GitHub Repository

Repository Link: `https://github.com/ary3141/bus-seat-booking`

---

## Features

### Core Features

* Choose between **Regular Class** and **Express Class**
* Dynamic seat layout based on selected bus class
* Select and unselect seats
* Clear selected seat highlight
* Maximum selection of **5 seats per booking**
* Live total price calculation
* Different pricing for window seats and regular seats
* Confirm booking button
* Confirmed seats become unavailable
* Local data storage using AsyncStorage
* Seat availability reset when all seats for a specific bus type and date are fully booked

---

### Bonus Features

* Departure date selection
* User must select a date before selecting seats
* Booked seats are tied to the selected departure date
* Seat reset only applies to the selected bus type and selected date
* Sales history screen
* Date filter for sales history
* Total revenue calculation
* Booking list showing:

  * Bus class
  * Departure date
  * Booked seats
  * Total booking price

---

## Bus Class Rules

### Regular Class

* Total seats: 20
* Layout: 10 seats left + 10 seats right
* Seat shape: square
* Window seat price: Rp 150.000
* Regular seat price: Rp 100.000

---

### Express Class

* Total seats: 12
* Layout: 6 seats left + 6 seats right
* Seat shape: rectangle
* Window seat price: Rp 200.000
* Regular seat price: Rp 150.000

---

## Tech Stack

* React Native
* Expo
* Expo Router
* TypeScript
* AsyncStorage

---

## Project Structure

```txt
bus-seat-booking/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── history.tsx
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   └── booking/
│   │
│   ├── constants/
│   ├── features/
│   │   ├── booking/
│   │   └── history/
│   │
│   ├── models/
│   ├── repositories/
│   ├── services/
│   ├── types/
│   └── utils/
│
├── package.json
└── README.md
```

---

## Architecture

This project uses a structured architecture to separate UI, logic, and storage.

```txt
Expo Router
↓
Screens / Features
↓
ViewModel Hooks
↓
Services
↓
Repository
↓
AsyncStorage
↓
Models + Constants + Utils
```

---

## Main Folders

### `app/`

Contains Expo Router pages.

* `index.tsx` - Booking screen route
* `history.tsx` - Sales history route
* `_layout.tsx` - App navigation layout

---

### `src/components/`

Contains reusable UI components.

* Common components:

  * AppButton
  * AppCard
  * AppHeader
  * AppScreen
  * DatePickerModal
  * EmptyState
  * StatusLegend

* Booking components:

  * BusClassSelector
  * SeatGrid
  * SeatItem
  * BookingSummaryCard

---

### `src/features/`

Contains screen-level features and state logic.

* `booking/`

  * BookingScreen
  * useBookingViewModel

* `history/`

  * HistoryScreen
  * useHistoryViewModel

---

### `src/models/`

Contains domain models.

* Booking
* Bus
* Seat

---

### `src/services/`

Contains business logic.

* BookingService
* SeatService
* StorageService

---

### `src/repositories/`

Contains storage access logic.

* BookingRepository

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/ary3141/bus-seat-booking.git
cd bus-seat-booking
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Start the project

```bash
npx expo start
```

---

### 4. Run on simulator or device

Press one of the Expo commands:

```txt
i - open iOS simulator
a - open Android emulator
```

Or scan the QR code using Expo Go if your device supports the project SDK version.

---

## How to Test the App

### Booking Flow

1. Open the app
2. Select Regular or Express bus class
3. Select a departure date
4. Select available seats
5. Check the total price
6. Tap Confirm Booking
7. Confirmed seats should become unavailable

---

### Sales History Flow

1. Tap the History button
2. View booking list
3. Check total revenue
4. Filter bookings by date
5. Tap Book to return to the booking screen

---

## Notes

* This app uses local storage only.
* No backend is required.
* Booked seats are stored locally using AsyncStorage.
* Seat availability is calculated based on bus type and departure date.
* When all seats for a bus type and date are booked, the seat availability for that bus type and date is reset.

---

## Author

M Dwiva Arya Erlangga
