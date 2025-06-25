from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

naming_convention = {
    "ix": "ix_%(column_0_label)s",  # indexing -> for better querying
    "uq": "uq_%(table_name)s_%(column_0_name)s",  # unique
    "ck": "ck_%(table_name)s_%(constraint_name)s",  # ck -> CHECK -> validations CHECK age > 18;
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",  # foreign key
    "pk": "pk_%(table_name)s",  # primary key
}


# this allows us to define tables and their columns
metadata = MetaData(naming_convention=naming_convention)

# create a db instance
db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    serialize_rules = ("-adoptionrequests.user")

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String)
    # role = db.Column(db.String, default='user')
    contact_info = db.Column(db.String, unique=True, nullable=False)
    created_at = db.Column(db.TIMESTAMP)
    
    adoptionrequests = db.relationship('AdoptionRequest', backpopulates='user', cascade='all, delete')

class Animal(db.Model, SerializerMixin):
    __tablename__ = "animal"
    serialize_rules = ("-adoptionrequests.animal")
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String, nullable=False)
    health_status = db.Column(db.String, nullable=False)
    adoption_status = db.Column(db.String, default='Available')
    created_at = db.Column(db.TIMESTAMP)

    adoptionrequests = db.relationship('AdoptionRequest', back_populates='animal', cascade='all, delete')

class AdoptionRequest(db.Model, SerializerMixin):
    __tablename__ = "adoptionrequests"
    serialize_rules = ("-user.adoptionrequests", "-animal.adoptionrequests")

    id = db.Column(db.Integer, primary_key=True)
    request_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String, default='pending', nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'))
    created_at = db.Column(db.TIMESTAMP)

    user = db.relationship('User', back_populates='adoptionrequests')
    animal = db.relationship('Animal', back_populates='adoptionrequests')

class Staff(db.Model, SerializerMixin):
    __tablename__ = "staffs"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String)
    contact_info = db.Column(db.String, unique=True, nullable=False)
    created_at = db.Column(db.TIMESTAMP)
  