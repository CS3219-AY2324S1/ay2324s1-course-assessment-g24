# code-execution/main.py: 
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import tempfile
import shutil
import os

app = FastAPI()

# Allow all origins during development, adjust as needed for production
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

class CodeRequest(BaseModel):
    code: str
    language: str

@app.post("/execute")
async def execute_code(request: CodeRequest):
    code = request.code
    language = request.language

    if language not in ["python", "javascript", "cpp"]:
        raise HTTPException(status_code=400, detail="Unsupported language")

    script_extension = "py" if language == "python" else "js" if language == "javascript" else "cpp"
    script_dir = tempfile.mkdtemp()
    script_path = os.path.join(script_dir, f"temp_script.{script_extension}")
    with open(script_path, "w") as script_file:
        script_file.write(code)
    try:
        if language == "python":
            process = subprocess.run(["python", script_path], capture_output=True, text=True)
        elif language == "javascript":
            process = subprocess.run(["node", script_path], capture_output=True, text=True)
        elif language == "cpp":
            print("Script Path:", script_path)
            compile_process = subprocess.run(["g++", script_path, "-o", "temp_executable"])
            if compile_process.returncode != 0:
                raise Exception("Compilation error")
            process = subprocess.run(["./temp_executable"], capture_output=True, text=True)
    except Exception as e:
        return {"output": f"Error executing code: {str(e)}"}
    finally:
        shutil.rmtree(script_dir)
    return {"output": process.stdout}
