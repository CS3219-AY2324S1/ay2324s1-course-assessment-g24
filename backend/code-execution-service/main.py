from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import platform
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
        return {"error_detail": "Unsupported language"}

    script_extension = "py" if language == "python" else "js" if language == "javascript" else "cpp"
    script_dir = tempfile.mkdtemp()
    script_path = os.path.join(script_dir, f"temp_script.{script_extension}")
    with open(script_path, "w") as script_file:
        script_file.write(code)

    error_detail = None

    try:
        if language == "python":
            process = subprocess.run([language, script_path], capture_output=True, text=True, timeout=5)
        elif language == "javascript":
            # Use Node.js to run JavaScript code
            process = subprocess.run(["node", script_path], capture_output=True, text=True, timeout=5)
        elif language == "cpp":
            compile_process = subprocess.run(["g++", script_path, "-o", "temp_executable"], capture_output=True, text=True, timeout=5)
            if compile_process.returncode != 0:
                error_detail = f"Error compiling code:\n{compile_process.stderr}\nExit Code: {compile_process.returncode}"
                return {"error_detail": error_detail}
            process = subprocess.run(["./temp_executable"], capture_output=True, text=True, timeout=5)
    except subprocess.CalledProcessError as e:
        error_detail = f"Error executing code:\n{e.stderr}\nExit Code: {e.returncode}"
    except Exception as e:
        import traceback
        traceback_str = traceback.format_exc()
        error_detail = f"Error executing code: {traceback_str}"

    finally:
        shutil.rmtree(script_dir)

    if error_detail is not None:
        return {"error_detail": error_detail}

    return {"output": process.stdout, "error": process.stderr, "error_detail": None}



