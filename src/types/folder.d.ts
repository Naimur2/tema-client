export interface IFile {
  _id?: string;
  fileName?: string;
  fileUrl?: string;
  fileType?: string;
  folderId?: string;
  __v?: number;
}

export interface IFolder {
  _id?: string;
  name?: string;
  files?: IFile[];
  __v?: number;
}

export interface IFoldersData {
  message?: string;
  data?: IFolder[];
}

export type THandleDoubleClick = (
  e?: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id?: string | number
) => void;

export interface IFilesORFolders {
  _id: string;
  name: string;
  files: IFile[];
  folders: IFolder[];
}

export interface IViewFolderORFileData {
  message: string;
  data: IFilesORFolders;
}

export type TThumbnailAndFile =
  | {
      thumbnailUrl?: string;
      fileName?: string;
      originalFileUrl?: string;
      id?: string | number;
    }
  | undefined;

export interface IViewFilesFolders {
  data?: IViewFolderORFileData;
  thumbnailAndFiles?: TThumbnailAndFile[];
}
