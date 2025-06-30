import os 

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api
from models import db
from resources.adoptionrequests import AdoptionResource
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from resources.animal import AnimalResource
# from resources.staffs import StaffResource
from resources.users import UserResources, LoginResource
from resources.adoptionrequests import AdoptionResource
from resources.staffSignup import StaffSignupResource


load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///adoption.db'  # or PostgreSQL/MySQL URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_ECHO"] = True
# Setup the Flask-JWT-Extended extension

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")  # Change this!
jwt = JWTManager(app)

bcrypt = Bcrypt(app)

    # Initialize extensions
db.init_app(app)
migrate=Migrate(app, db)
api = Api(app)
# api.add_resource(AdoptionRequest, "/adoptionrequest")
# api.add_resource(AdoptionRequest, "/adoptionrequest/<int:id>")
# CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
  

api.add_resource(AnimalResource, '/animals', '/animals/<int:id>') 
# api.add_resource(StaffResource, '/staffs', '/staffs/<int:id>') 
api.add_resource(UserResources, '/users', '/users/<int:id>') 
api.add_resource(AdoptionResource, '/adoptions', '/adoptions/<int:id>') 
api.add_resource(LoginResource, '/login') 
api.add_resource(StaffSignupResource, "/staff/signup")


# Entry point for running directly
if __name__ == '__main__':
    app.run(port=5555)