from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

class User(db.Model):
    __tablename__='people'
    id = Column(Integer, primary_key=True)
    username= Column(String(64), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    passs_hash= Column(String(256), nullable=False)
    role= Column(String(64), nullable=False)
    def set_password(self,password):
        self.passs_hash = generate_password_hash(password)
    def check_password(self,password):
        return check_password_hash(self.passs_hash, password)
class Requests(db.Model):
    __tablename__='requests'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('people.id'), nullable=False)
    title= Column(String(256), nullable=False)
    description = Column(String(512), nullable=False)
    createdate=(Column(DateTime, nullable=False))
    status = Column(String(64), nullable=False, default='pending')


