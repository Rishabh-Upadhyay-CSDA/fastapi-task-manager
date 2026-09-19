from pydantic import BaseModel
from typing import Optional

# Base schema with shared attributes
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False

# Schema for creating a new task
class TaskCreate(TaskBase):
    pass

# Schema for updating a task
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

# Schema for returning a task (includes database ID)
class TaskResponse(TaskBase):
    id: int

    class Config:
        from_attributes = True