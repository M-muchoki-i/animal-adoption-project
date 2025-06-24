from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from flask_cors import CORS
from flask_restful import Api
from models import db
# from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity




app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///adoption.db'  # or PostgreSQL/MySQL URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    # Initialize extensions
db.init_app(app)
migrate=Migrate(app, db)
api = Api(app)
    
# CORS(app)
  

 
# Entry point for running directly
if __name__ == '__main__':
    app.run(port=5555)