## PeerPrep Backend using FastAPI Microservices 
We are using FastAPI for building the microservices that will support various features in the application. 

### Basic Instructions 
- Each microservice has its own directory. The directory naming follows the basic convention of appending `-service` to whatever is trying to be achieved. 
- Each microservice has its own `requirements.txt`, specifying all the python packages used that would help us replicate the virutal environment for development. 

### Steps to Replicate Dev Environment
In order to create the virtual environment, navigate to the microservice of interest. 
```
cd backend/<name>-service
```

One can call the `python` command using the `mod` or `-m` flag, which helps it run a library module as a script, to create a virtual environment. 
```
python -m venv .venv
```

The creation of virtual environment is a one-off step that has to be done on the local machine once per microservice. If you already have a virtual environment, you can directly proceed to activate it.
This should create the `.venv` directory inside the microservice. In order to activate the virtual environment, one can source the activate executable. 
```
source .venv/bin/activate
```

Depending on the terminal client being used, there should be a visual cue indicating that the virtual environment has been activated. 
Now, the required packages can be installed using the following command. 
```
pip install -r requirements.txt
```

If the file, `requirements.txt`, is not present in the directory, you can proceed to install the packages directly using the `pip` command. Once you are done, you can create a `requirements.txt` file yourself to help future users to install the packages with correct versions. Think of `requirements.txt` acting like a `package-lock.json` file that locks in the dependencies and their versions. In order to create your `requirements.txt` file, use the following command. 
```
pip freeze > requirements.txt
```

### Service Descriptions


### Directory Structure 
This is the directory structure of the `backend` directory.
```
.
├── user-service
│   ├── requirements.txt
│   ├── main.py
│   └── README.md
├── question-service
├── matching-service
├── collaboration-service
└── README.md                # You are currently here
```
