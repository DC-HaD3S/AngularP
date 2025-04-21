
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
┃   ┗ 📁 app/
┃     ┣ 📁 components/
┃     ┃   ┣ 📁 about/
┃     ┃   ┃   ┣ 📄 about.component.css
┃     ┃   ┃   ┣ 📄 about.component.html
┃     ┃   ┃   ┗ 📄 about.component.ts
┃     ┃   ┣ 📁 contact/
┃     ┃   ┃   ┣ 📄 contact.component.css
┃     ┃   ┃   ┣ 📄 contact.component.html
┃     ┃   ┃   ┗ 📄 contact.component.ts
┃     ┃   ┣ 📁 details/
┃     ┃   ┃   ┣ 📄 details.component.css
┃     ┃   ┃   ┣ 📄 details.component.html
┃     ┃   ┃   ┗ 📄 details.component.ts
┃     ┃   ┣ 📁 home/
┃     ┃   ┃   ┣ 📄 home.component.css
┃     ┃   ┃   ┣ 📄 home.component.html
┃     ┃   ┃   ┗ 📄 home.component.ts
┃     ┃   ┣ 📁 housing-location/
┃     ┃   ┃   ┣ 📄 housing-location.component.css
┃     ┃   ┃   ┣ 📄 housing-location.component.html
┃     ┃   ┃   ┗ 📄 housing-location.component.ts
┃     ┃   ┣ 📁 privacy-policy/
┃     ┃   ┃   ┣ 📄 privacy-policy.component.css
┃     ┃   ┃   ┣ 📄 privacy-policy.component.html
┃     ┃   ┃   ┗ 📄 privacy-policy.component.ts
┃     ┃   ┣ 📁 terms-and-conditions/
┃     ┃   ┃   ┣ 📄 terms-and-conditions.component.css
┃     ┃   ┃   ┣ 📄 terms-and-conditions.component.html
┃     ┃   ┃   ┗ 📄 terms-and-conditions.component.ts
┃     ┣ 📁 core/
┃     ┃   ┣ 📁 service/
┃     ┃   ┃   ┗ 📄 housing.service.ts
┃     ┃   ┣ 📁 interface/
┃     ┃   ┃   ┗ 📄 housinglocation.ts
┃     ┃   ┣ 📄 core.module.ts
┃     ┣ 📁 shared/
┃     ┃   ┣ 📁 components/
┃     ┃   ┃   ┣ 📁 footer/
┃     ┃   ┃   ┃   ┣ 📄 footer.component.css
┃     ┃   ┃   ┃   ┣ 📄 footer.component.html
┃     ┃   ┃   ┃   ┗ 📄 footer.component.ts
┃     ┃   ┃   ┣ 📁 header/
┃     ┃   ┃   ┃   ┣ 📄 header.component.css
┃     ┃   ┃   ┃   ┣ 📄 header.component.html
┃     ┃   ┃   ┃   ┗ 📄 header.component.ts
┃     ┃   ┣ 📁 directives/
┃     ┃   ┃   ┣ 📄 click-outside.directive.spec.ts
┃     ┃   ┃   ┣ 📄 click-outside.directive.ts
┃     ┃   ┃   ┣ 📄 highlight.directive.spec.ts
┃     ┃   ┃   ┗ 📄 highlight.directive.ts
┃     ┃   ┣ 📁 pipes/
┃     ┃   ┃   ┣ 📄 capitalize.pipe.spec.ts
┃     ┃   ┃   ┣ 📄 capitalize.pipe.ts
┃     ┃   ┃   ┣ 📄 truncate.pipe.spec.ts
┃     ┃   ┃   ┗ 📄 truncate.pipe.ts
┃     ┣ 📄 app.component.css
┃     ┣ 📄 app.component.html
┃     ┣ 📄 app.component.ts
┃     ┣ 📄 routes.ts
┃   ━ 📁 assets/
┃   ┃   ┣ 📄 location-pin.svg
┃   ┃   ┗ 📄 logo.svg
┃   ┣ 📄 favicon.ico
┃   ┣ 📄 angular.json
┃   ┣ 📄 package.json
┃   ┣ 📄 db.json  <-- Mock backend data (in root)
┃   ┣ 📄 package-lock.json
┃   ┣ 📄 README.md
┃   ┣ 📄 tsconfig.app.json
┃   ┣ 📄 tsconfig.json
┃   ┗ 📄 tsconfig.spec.json

```

---

## 🙌 Credits

Based on the official Angular documentation with enhancements for learning and practice.


