import React, { useCallback, useEffect, useState } from "react";
import { Button, message, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { useFetch } from "../../../../utils";

const STATUSSES = {
  UPLOADING: "uploading",
  DONE: "done",
  ERROR: "error",
};

export const Documents = () => {
  const url = "/crm/rest/upload";
  const [docs, setDocs] = useState([]);
  const { response, loading } = useFetch({ url });

  useEffect(() => {
    // eslint-disable-next-line
    if (response?.data) {
      const formData = new FormData(response?.data);
      console.log(formData);
    }
  }, [response]);

  const handleChange = useCallback(({ file, fileList }: UploadChangeParam) => {
    if (file.status !== STATUSSES.UPLOADING) {
      console.log(file, fileList);
    }
    if (file.status === STATUSSES.DONE) {
      message.success("upload successfull");
    } else if (file.status === "error") {
      message.error("upload error");
    }
  }, []);

  //   useEffect(() => {
  //     // console.log(response?.data);
  //   }, []);

  return (
    <Upload
      name="file"
      action="/crm/rest/upload"
      onChange={handleChange}
      defaultFileList={docs}
    >
      <Button>Click to Upload</Button>
    </Upload>
  );
};
