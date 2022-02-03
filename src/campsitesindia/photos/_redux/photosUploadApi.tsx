import axios from "axios";


export function uploadPhotos (files)
     {
        const formData = new FormData();
        formData.append('location', 'test');
        formData.append('listingName', 'mp');
        files.forEach(file=>{
            console.log(file);

            formData.append("files", file);
        });

        console.log(formData.get("files"))
        console.log(formData);

        const result = axios.post("api/upload", "files",
            { headers:{"Content-Type": "multipart/form-data" }});
        //thunkAPI.dispatch(getEntities({}));
        return result;

     }


