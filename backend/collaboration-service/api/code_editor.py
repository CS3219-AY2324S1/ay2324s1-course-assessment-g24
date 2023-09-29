from fastapi import APIRouter
from controllers.code_editor_controller import router as code_editor_router

router = APIRouter()
router.include_router(code_editor_router, prefix="/code_editor", tags=["code_editor"])
