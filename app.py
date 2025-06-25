from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from flask_cors import CORS
from flask_restful import Api
from models import db
# from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity

from resources.animal import AnimalResource
from resources.staffs import StaffResource
from resources.users import UserResources
# from resources.adoptionrequests import AdoptionResource




app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///adoption.db'  # or PostgreSQL/MySQL URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    # Initialize extensions
db.init_app(app)
migrate=Migrate(app, db)
api = Api(app)
    
# CORS(app)
  

api.add_resource(AnimalResource, '/animals', '/animals/<int:id>') 
api.add_resource(StaffResource, '/staffs', '/staffs/<int:id>') 
api.add_resource(UserResources, '/users', '/users/<int:id>') 
# api.add_resource(AdoptionResource, '/adpotions', '/adoptions/<int:id>') 

# Entry point for running directly
if __name__ == '__main__':
    app.run(port=5555)