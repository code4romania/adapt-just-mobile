import { UploadService } from '~/services';

export const uploadFile = async (file) => {
  const uri = file.uri;
  const type = file.type;
  const name = uri.split('/').pop();

  const fileData = {
    uri,
    name,
    type,
  };

  let data = new FormData();
  data.append('file', fileData);

  try {
    const response = await UploadService.uploadFile(data);
    const upload = response.data;

    return upload;
  } catch (error) {
    return null;
  }
};
