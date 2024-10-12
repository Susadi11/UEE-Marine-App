import axios from 'axios';

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const API_KEY = "Your_API_KEY";

const config = {
    headers:{
        'content-type' : 'application/json',
        'X-Goog-Api-Key' : API_KEY, 
        'X-Goog-FieldMask' : ['plcaes.displayName',
            'places.formattedAddress',
            'places,location', 
            'places.photo'
        ]

    }
}

const NewNearByPlace =(data: any)=>axios.post(BASE_URL, data, config);

export default{
    NewNearByPlace
}
