
# 🚀 Angular First App

This is a simple Angular 16 project created as a first app using official documentation. It uses a mock backend powered by `json-server`.

## 📦 Tech Stack

- 🅰️ Angular 16  
- 🟢 Node.js v18.10.0  
- 🗄️ JSON Server for mock API  

---

## 🛠️ Getting Started

Follow the steps below to run the project locally:

### 1. 🔧 Install Dependencies

Make sure you have Node.js and Angular CLI installed:

```bash
node -v         # Should show v18.10.0
npm install -g @angular/cli
```

Install project dependencies:

```bash
cd first-app
npm install
```

---

### 2. 🗃️ Start JSON Server

Start the mock backend server (make sure `db.json` is present in root):

```bash
json-server --watch db.json --port=8000
```

> 📌 This should be running **before** starting the Angular app.

---

### 3. 🚦 Run Angular App

Now serve the Angular app from the `first-app` directory:

```bash
ng serve
```

The app will be available at:

```
http://localhost:4200
```


---

## ✅ Done!

Open your browser and visit the following URL to run and test the Angular app:

```
http://localhost:4200
```

> 🧪 This will load your first Angular application — test the features and explore the UI 🎉

---

## 📁 Project Structure

```
📦 first-app/
┣ 📁 .angular/
┣ 📁 .vscode/
┣ 📁 e2e/
┣ 📁 node_modules/
┣ 📁 src/
┃ ┗ 📁 app/
┃   ┣ 📁 components/
┃   ┃ ┣ 📁 details/
┃   ┃ ┃ ┣ 📄 details.component.css
┃   ┃ ┃ ┣ 📄 details.component.html
┃   ┃ ┃ ┗ 📄 details.component.ts
┃   ┃ ┣ 📁 home/
┃   ┃ ┃ ┣ 📄 home.component.css
┃   ┃ ┃ ┣ 📄 home.component.html
┃   ┃ ┃ ┗ 📄 home.component.ts
┃   ┃ ┗ 📁 housing-location/
┃   ┃   ┣ 📄 housing-location.component.css
┃   ┃   ┣ 📄 housing-location.component.html
┃   ┃   ┗ 📄 housing-location.component.ts
┃   ┣ 📁 interface/
┃   ┃ ┗ 📄 housinglocation.ts
┃   ┣ 📁 service/
┃   ┃ ┗ 📄 housing.service.ts
┃   ┣ 📄 app.component.css
┃   ┣ 📄 app.component.html
┃   ┣ 📄 app.component.ts
┃   ┗ 📄 routes.ts
┣ 📁 assets/
┃   ┣ 📄 location-pin.svg
┃   ┗ 📄 logo.svg 
┣ 📄 favicon.ico
┣ 📄 angular.json
┣ 📄 package.json
┣ 📄 db.json  <-- Mock backend data (in root)
┣ 📄 package-lock.json
┣ 📄 package.json
┣ 📄 README.md
┣ 📄 tsconfig.app.json
┣ 📄 tsconfig.json
┗ 📄 tsconfig.spec.json
```

---

## 🙌 Credits

Based on the official Angular documentation with enhancements for learning and practice.


