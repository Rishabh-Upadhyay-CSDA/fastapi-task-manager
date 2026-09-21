import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from main import app
from database import Base, engine, get_db

# Separate test database in memory
SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override get_db dependency for tests
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="module", autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

client = TestClient(app)

def test_signup_and_login():
    # 1. Test Signup
    signup_response = client.post(
        "/signup",
        json={"email": "tester@example.com", "password": "password123"}
    )
    assert signup_response.status_code in (200, 201)
    assert signup_response.json()["email"] == "tester@example.com"

    # 2. Test Login
    login_response = client.post(
        "/login",
        data={"username": "tester@example.com", "password": "password123"}
    )
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()

def test_create_task_unauthorized():
    response = client.post("/tasks", json={"title": "Unauthenticated Task"})
    assert response.status_code == 401