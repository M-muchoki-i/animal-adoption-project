from flask import request
from flask_restful import Resource, reqparse
from models import Animal, db

class AnimalResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('request_date', required =True, help="Request date is required")
    parser.add_argument('status', required=True, help="Status is required")
    parser.add_argument('user_id', required=False)
    parser.add_argument('animal_id', required=False)
    parser.add_argument('created_at', required=True, help ="Created time is required")
    parser.add_argument('health_status', required=False)
    
    
