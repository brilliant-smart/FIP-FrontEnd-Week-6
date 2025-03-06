# 📝 Recruitment Form (React-Bootstrap)

This project is a **React-based recruitment form**, converted from a previous **Vanilla JavaScript and Bootstrap** implementation.  
The focus of this conversion was to **demonstrate Asynchronous React concepts**, including **JSON handling, Form Data processing, Promises, and Async/Await**.

---

## 📌 Learning Outcome: Asynchronous React

This project demonstrates:

✔ **Fetching JSON Data** using `fetch()` and `Async/Await`  
✔ **Handling Promises** when retrieving local JSON data  
✔ **Processing Form Data asynchronously**  
✔ **Managing multiple asynchronous operations in React**

---

## ✅ How the Project Fulfills the Deliverables

### **1️⃣ Fetching JSON Data (Async/Await & Promises)**

- Instead of using a `<datalist>` like in the Vanilla JS version, the app now **fetches ward, LGA, and code data from a JSON file**.
- This **fetch request is asynchronous** and handled with **Async/Await** inside a React component.
- The data is **stored in state** and used to dynamically **populate the form fields**.

### **2️⃣ Handling Form Data Asynchronously**

- The form captures user input and **processes the data asynchronously**.
- React **state (`useState`)** is used to manage form inputs.

### **3️⃣ Handling Multiple Async Operations**

- The app dynamically updates **LGA and Code fields based on the selected Ward**, ensuring a **smooth user experience**.
- Since the **data retrieval is asynchronous**, React updates the UI **only after fetching the data successfully**.

---

## ❓ Why an External API Was Not Used?

The project meets the **learning objectives** using a **local JSON file** instead of an **external API**:

- **Fetching from a local JSON file** still **demonstrates the same async behavior** as calling an API.
- **Using an external API would have been an alternative**, but it **was not required** to fulfill the learning outcomes.

---

## 🛠 Tech Stack

- **React** (Created using **Vite**)
- **Bootstrap & React-Bootstrap** for styling
- **Async/Await & Promises** for asynchronous operations
- **Local JSON file** for dynamic data

---

## 🚀 How to Run the Project

### **1️⃣ Clone the Repository**

```sh
git clone <repository-url>
cd recruitment-form
npm install
npm run dev
```
