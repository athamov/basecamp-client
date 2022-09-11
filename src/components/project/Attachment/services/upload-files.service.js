import http from "../../../../http/index";

class UploadFilesService {
  convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

async upload(project_id,file, onUploadProgress) {
    let formData = new FormData();
    let baseData = await this.convertBase64(file);
    formData.append("file", file);

    return http.post(`project/${project_id}/upload`, {base64data:baseData,name:file.name}, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles(id) {
    return http.get("/project/"+id+"/upload");
  }
  deleteFile(id,upload_id) {
    return http.delete("/project/"+id+"/upload/"+upload_id);
  }
}

export default new UploadFilesService();
