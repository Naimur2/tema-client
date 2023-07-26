// interface IFile {
//   name?: string;
//   type?: string;
//   url?: string;
//   _id?: string;
// }

import { IFile } from "types/folder";


const fetchRemoteFileAsBlob = async (fileUrl: string): Promise<Blob | null> => {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch the file.");
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error fetching the file:", error);
    return null;
  }
};

export const convertToFile = async (
  data?: IFile
): Promise<File | null> => {
  const blob = await fetchRemoteFileAsBlob(data?.fileUrl ?? "");
  if (blob) {
    const file = new File([blob], data?.fileName ?? "", { type: data?.fileType ?? "" });
    return file;
  } else {
    return null;
  }
};

export const getThumbnailAndFile = async (fileData?: IFile) => {
  const file = await convertToFile(fileData);
  if (file) {
    // Display the thumbnail using the temporary URL
    const thumbnailUrl = URL.createObjectURL(file);
    console.log("Thumbnail URL:", thumbnailUrl);

    // Get the original name of the file
    const fileName = file.name;
    console.log("File Name:", fileName);

    // Now you can use the file as needed, for example, upload it to a server.
    console.log("Converted File:", file);
    return {
      thumbnailUrl,
      fileName,
      originalFileUrl: fileData?.fileUrl ?? "",
      id: fileData?._id ?? "N/A",
    };
  } else {
    console.error("Failed to convert file.");
  }
};

export const downloadFile = async ({
  filename = "",
  fileUrl = "",
}: {
  filename: string;
  fileUrl: string;
}) => {
  try {
    // Fetch the file data from the server using a ReadStream
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch the file.");
    }

    // Read the response data as a Blob
    const blob = await response.blob();

    // Create a temporary anchor element
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);

    // Set the download attribute and filename
    anchor.setAttribute("download", filename);

    // Trigger the download
    anchor.click();

    // Cleanup the temporary anchor
    URL.revokeObjectURL(anchor.href);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};
