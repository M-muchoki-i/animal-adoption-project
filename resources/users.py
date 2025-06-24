from flask_restful import Resource, request, jsonify
from models import User, db


class UserResources(Resource):
    def get(self, id=None):
        if id is None:
            users = User.query.all()
            return [user.to_dict() for user in users]

        user = User.query.filter_by(id=id).first()
        if user is None:
            return {"message": "User not found"}, 404
        return user.to_dict()

    def post(self):
        data = request.get_json()
        # create Apperance object
        try:
            new_user = User(
                name=data.get("name"),
                email=data.get("email"),
                password=data.get("password"),
                contact_info=data.get("contact_info"),
            )
            db.session.add(new_user)
            db.session.commit()

            # Successful response structure
            return jsonify(new_user.to_dict()), 201

        except Exception:
            db.session.rollback()
            return {"errors": ["User Not found "]}, 400
        
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
            db.session.add(new_user)
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

        return {"message": "User deleted successfully"}, 204  # No content
