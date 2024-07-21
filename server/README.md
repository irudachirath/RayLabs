# RayLabs Backend

This project is a FastAPI application that integrates with Firebase Realtime Database. Below are the instructions for setting up this project on a new computer.

## Prerequisites

1. **Python 3.8+**: Ensure you have Python 3.8 or newer installed. You can download it from [python.org](https://www.python.org/downloads/).

2. **Firebase Project**: You need a Firebase project with Realtime Database. Follow [this guide](https://firebase.google.com/docs/web/setup) to set up a Firebase project and download the service account key file.

3. **Git**: Ensure you have Git installed. You can download it from [git-scm.com](https://git-scm.com/).

## Setup Instructions

### 1. Create a virtual environment

```bash
python -m venv venv
```

### 2. Activate the virtual environment

- Windows

```bash
venv\Scripts\activate
```

- MacOS

```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Update main.py

update the value of cred_path to file path of credential.json file
(will be changed in the future)

### 5. Run the Application

```bash
uvicorn main:app --reload
```
