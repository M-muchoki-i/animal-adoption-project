from flask import request, jsonify
from flask_restful import Resource, reqparse
from models import User, db


class UserResources(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("name", type=str, required=True, help="Name is required")
    parser.add_argument("email", type=str, required=True, help="Email is required")
    parser.add_argument("password", type=str, required=False)
    parser.add_argument("contact_info", type=str, required=True, help="Contact_info is required")

    def get(self, id=None):
        if id is None:
            users = User.query.all()
            return [user.to_dict() for user in users]

        user = User.query.filter_by(id=id).first()
        if user is None:
            return {"message": "User not found"}, 404 #error message if user not found
        return user.to_dict()

    def post(self):
        data = self.parser.parse_args()
        # create Apperance object
        try:
            # validate the uniquness of email and contact info
            if User.query.filter_by(email=data['email']).first():
                return {"error": "Email already exists"}, 409
            if User.query.filter_by(contact_info=data['contact_info']).first():
                return {"error": "Contact info already exists"}, 409
            
            new_user = User(
                name=data["name"],
                email=data["email"],
                password=data.get("password"),
                contact_info=data["contact_info"],
            )
            db.session.add(new_user)
            db.session.commit()

            # Successful response structure
            return jsonify(new_user.to_dict()), 201

        except Exception:
            db.session.rollback()
            return {"errors": ["User added successfully"]}, 200
        
    def patch(self):
        data = request.get_json()
        # create Apperance object
        try:
            new_user = User(
                name=data.get("name"),
                email=data.get("email"),
                password=data.get("password"),
                contact_info=data.get("contact_info"),
            )
            # commit the update to the database
            db.session.commit()

            # Successful response structure
            return jsonify(new_user.to_dict()), 201

        except Exception:
            db.session.rollback()
            return {"errors": ["User Not found "]}, 400
        
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
