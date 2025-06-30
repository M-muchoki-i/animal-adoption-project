from flask import request
from flask_restful import Resource, reqparse
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import User,Staff, db


class UserResources(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("name", type=str, required=True, help="Name is required")
    parser.add_argument("email", type=str, required=True, help="Email is required")
    parser.add_argument("password", type=str, required=True)
    parser.add_argument("contact_info", type=str, required=True, help="Contact_info is required")
    


    def get(self, id=None):
        if id is None:
            users = User.query.all()
            return [user.to_dict() for user in users], 200

        user = User.query.filter_by(id=id).first()
        if user is None:
            return {"message": "User not found"}, 404
        return user.to_dict(), 200
    
    def post(self):
        data = UserResources.parser.parse_args()
        try:
            # Check for uniqueness
            if User.query.filter_by(email=data["email"]).first():
                return {"error": "Email already exists"}, 422
            if User.query.filter_by(contact_info=data["contact_info"]).first():
                return {"error": "Contact info already exists"}, 409
            
            hash = generate_password_hash(data['password']).decode('utf-8')
            


            new_user = User(
                name=data["name"],
                email=data["email"],
                password = hash,
                contact_info=data["contact_info"]

                # password=data.get("password"),
                # contact_info=data["contact_info"],
                # role=data.get("role", "user"),


            )
            db.session.add(new_user)
            db.session.commit()

            return new_user.to_dict(), 201
        except Exception:
            db.session.rollback()
            return {"message": ["User added successfully"]}, 200
        
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {"error": "User not found"}, 404

        data = request.get_json()

        try:
            user.name = data.get("name", user.name)
            user.email = data.get("email", user.email)
            user.contact_info = data.get("contact_info", user.contact_info)

            db.session.commit()
            return user.to_dict(), 200

        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
        

      
    def delete(self, id):
        user = User.query.filter_by(id=id).first()  # Fetch the user member by ID
        if user is None:
            return {
                "error message": "User not found"
            }, 404  # if the user doesnt exist

        # Then we delete the user member from the database
        db.session.delete(user)
        db.session.commit()  # Commits the deletion

        return {"message": "User deleted successfully"}, 202  # No content
    


class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"error": "Email and password are required"}, 400

        # Try to log in as a regular user
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            token = create_access_token(identity={
                "id": user.id,
                "name": user.name,
                "is_staff": False
            })
            return {"access_token": token}, 200

        # Try to log in as a staff member
        staff = Staff.query.filter_by(email=email).first()
        if staff and check_password_hash(staff.password, password):
            token = create_access_token(identity={
                "id": staff.id,
                "name": staff.name,
                "is_staff": True
            })
            return {"access_token": token}, 200

        return {"error": "Invalid credentials"}, 401


