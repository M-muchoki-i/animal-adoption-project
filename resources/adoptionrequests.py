from flask import request
from flask_restful import Resource, reqparse
from models import AdoptionRequest, db

class AnimalResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('request_date', required =True, help="Request date is required")
    parser.add_argument('status', required=True, help="Status is required")
    parser.add_argument('user_id', required=False)
    parser.add_argument('animal_id', required=False)
    parser.add_argument('created_at', required=True, help ="Created time is required")

    def get(self, id=None):
        if id is None:
            adoption_request = AdoptionRequest.query.all()
            return [adoption_req.to_dict() for adoption_req in adoption_request], 200  
        else:
            adoption_request = AdoptionRequest.query.filter_by(id=id).first()
            if adoption_request:
                return adoption_request.to_dict(), 200
            return {"error": "Animal not found"}, 404
    
