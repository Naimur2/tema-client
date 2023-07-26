import { IFoldersData, IViewFolderORFileData } from "types/folder";
import { apiSlice } from "..";

export const folderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFolder: builder.mutation({
      query: (body) => ({
        url: "/folders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["folders"],
    }),
    // new
    createNewFolder: builder.mutation({
      query: (body) => ({
        url: `/folders`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["folders"],
    }),
    getFolders: builder.query<IFoldersData, void>({
      query: () => ({
        url: "/folders?noParent=true",
        method: "GET",
      }),
      providesTags: ["folders"],
    }),
    getFolderById: builder.query<
      IViewFolderORFileData,
      string | number | undefined
    >({
      query: (id) => ({
        url: `/folders/${id}`,
        method: "GET",
      }),
      providesTags: ["folders"],
    }),
    updateFolder: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/folders/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["folders"],
    }),
    uploadFile: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/folders/files/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["folders"],
    }),
    deleteAFile: builder.mutation({
      query: ({ folderId, fileId }) => ({
        url: `/folders/files?fileId=${fileId}&folderId=${folderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["folders"],
    }),
    deleteFolder: builder.mutation({
      query: (id) => ({
        url: `/folders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["folders"],
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useGetFoldersQuery,
  useGetFolderByIdQuery,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
  useUploadFileMutation,
  useCreateNewFolderMutation,
  useDeleteAFileMutation,
} = folderApiSlice;
