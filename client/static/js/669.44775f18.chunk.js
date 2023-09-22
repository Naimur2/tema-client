"use strict";(self.webpackChunktema_client=self.webpackChunktema_client||[]).push([[669],{9999:function(e,r,n){var t=n(184);r.Z=function(e){e.error;return(0,t.jsx)("p",{className:"text-red-500",children:"An error occurred"})}},1084:function(e,r,n){n.d(r,{Z:function(){return d}});var t=n(9439),i=n(9515),o=n(2791),l=n(184);function d(e){var r=e.children,n=e.trigger,d=e.title,a=(0,o.useState)(),s=(0,t.Z)(a,2),u=s[0],c=s[1];return console.log("type of children: ",typeof r),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("span",{onClick:function(){return c("default")},children:n}),(0,l.jsxs)(i.u_,{show:"default"===u,onClose:function(){return c(void 0)},children:[(0,l.jsx)(i.u_.Header,{children:d}),(0,l.jsx)(i.u_.Body,{children:"function"===typeof r?r({openModal:u,setOpenModal:c}):r})]})]})}},6133:function(e,r,n){var t=n(184);r.Z=function(){return(0,t.jsx)("p",{className:"mr-2 mt-6 flex justify-end text-lg font-bold text-yellow-500",children:"Please Wait. Fetching...."})}},2105:function(e,r,n){var t=n(184);r.Z=function(e){var r=e.isLoading,n=e.isError,i=e.isFetching,o=e.isSuccess,l=e.ui,d=e.loadingUi,a=e.fetchingUi,s=e.errorUi,u=e.paginationUi;return r?(0,t.jsx)(t.Fragment,{children:d}):!r&&n?(0,t.jsx)(t.Fragment,{children:s}):!r&&!n&&i&&a?(0,t.jsxs)("div",{children:[l,a]}):!r&&!n&&o&&u?(0,t.jsxs)(t.Fragment,{children:[l,u]}):(r||n||!o)&&(r||n||!o)?(0,t.jsx)("p",{className:"text-red-500",children:"No condition matched. Logical Error Ocurred. Please contact to developer!"}):(0,t.jsx)(t.Fragment,{children:l})}},5362:function(e,r,n){var t=n(1413),i=n(4165),o=n(5861),l=n(5705),d=n(9515),a=n(7721),s=n(8007),u=n(184);r.Z=function(e){var r=e.isShowFormTitle,n=e.onSubmit,c=void 0===n?(0,o.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))):n,f=e.isLoading,m=(0,l.TA)({initialValues:{name:""},onSubmit:c,validationSchema:s.Ry({name:s.Z_().required("Required")})}),h=m.getFieldProps,v=m.handleSubmit,x=m.errors,g=m.touched;return(0,u.jsxs)("div",{className:"grid gap-4",children:[r&&(0,u.jsx)("h2",{className:"text-2xl font-semibold leading-tight text-gray-800 dark:text-white",children:"Create event"}),(0,u.jsxs)("form",{onSubmit:v,className:"mt-10 grid gap-4",children:[(0,u.jsxs)("div",{className:"mb-4 flex flex-col gap-4",children:[(0,u.jsx)(d.__,{htmlFor:"folder_name",children:"File Name"}),(0,u.jsx)(d.oi,(0,t.Z)({id:"folder_name",placeholder:"Enter folder name",helperText:g.name&&x.name},h("name")))]}),(0,u.jsx)("div",{className:"mb-6 mt-20",children:(0,u.jsx)(d.zx,{type:"submit",className:"w-full lg:w-auto bg-primary-900 hover:bg-primary-700",children:"Create Folder"})}),(0,u.jsx)(a.Z,{isLoading:f})]})]})}},3354:function(e,r,n){var t=n(184);r.Z=function(e){var r=e.folder,n=void 0===r?{_id:"",name:"",files:[],__v:0}:r,i=e.handleFolderDoubleClick,o=void 0===i?function(){}:i;return(0,t.jsxs)("div",{onClick:function(e){return o(e,null===n||void 0===n?void 0:n._id)},className:"flex flex-col justify-center items-center gap-1 cursor-pointer hover:opacity-95",children:[(0,t.jsx)("img",{className:"w-24",src:"/Mac_Folder_Icon.png",alt:"".concat(null===n||void 0===n?void 0:n.name," folder icon")}),(0,t.jsx)("p",{className:"text-white w-20 pb-1 break-words",children:null===n||void 0===n?void 0:n.name})]})}},6669:function(e,r,n){n.r(r),n.d(r,{default:function(){return b}});var t=n(1413),i=n(4165),o=n(5861),l=n(9439),d=n(4925),a=n(9999),s=n(6133),u=n(7721),c=n(2105),f=n(3719),m=n(2791),h=n(3354),v=n(7689),x=n(1084),g=n(9515),p=n(8820),j=n(5362),y=n(4303),F=n(184),Z=["data"];function b(){var e,r=(0,f.VW)(),n=r.data,b=(0,d.Z)(r,Z),w=(0,f.we)(),N=(0,l.Z)(w,1)[0],T=(0,v.s0)(),_=(0,m.useCallback)((function(e,r){2===(null===e||void 0===e?void 0:e.detail)&&(console.log("folder double clicked",e.detail),T("/dashboard/folders/".concat(r)))}),[]);return(0,F.jsxs)("div",{className:"space-y-4",children:[(0,F.jsx)("div",{className:"flex justify-start gap-2",children:(0,F.jsx)(x.Z,{title:"Add Folder",trigger:(0,F.jsxs)(g.zx,{type:"button",color:"light",children:[(0,F.jsx)(p.$cT,{className:"w-5 h-5 fill-[#69CAF7] cursor-pointer mr-1"})," ","Add Folder"]}),children:function(e){var r=e.setOpenModal,n=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(n){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N({name:n.name}).unwrap();case 3:y.Z.fire({title:"Success",text:"Folder added successfully",icon:"success"}),null===r||void 0===r||r(void 0),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),y.Z.fire({title:"Error",text:(null===e.t0||void 0===e.t0||null===(t=e.t0.data)||void 0===t?void 0:t.message)||"Something went wrong",icon:"error"});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(r){return e.apply(this,arguments)}}();return(0,F.jsx)(j.Z,{onSubmit:n})}})}),(0,F.jsx)(c.Z,(0,t.Z)((0,t.Z)({},b),{},{ui:(0,F.jsx)("div",{className:"flex flex-wrap gap-4",children:null===n||void 0===n||null===(e=n.data)||void 0===e?void 0:e.map((function(e){return(0,F.jsx)(h.Z,{folder:e,handleFolderDoubleClick:_})}))}),loadingUi:(0,F.jsx)(u.Z,{isLoading:null===b||void 0===b?void 0:b.isLoading}),fetchingUi:(0,F.jsx)(s.Z,{}),errorUi:(0,F.jsx)(a.Z,{})}))]})}},3719:function(e,r,n){n.d(r,{F2:function(){return m},NO:function(){return f},Q1:function(){return u},VW:function(){return s},Yh:function(){return c},we:function(){return a}});var t=n(4925),i=n(2901),o=["id"],l=["id"],d=i.g.injectEndpoints({endpoints:function(e){return{createFolder:e.mutation({query:function(e){return{url:"/folders",method:"POST",body:e}},invalidatesTags:["folders"]}),createNewFolder:e.mutation({query:function(e){return{url:"/folders",method:"POST",body:e}},invalidatesTags:["folders"]}),getFolders:e.query({query:function(){return{url:"/folders?noParent=true",method:"GET"}},providesTags:["folders"]}),getFolderById:e.query({query:function(e){return{url:"/folders/".concat(e),method:"GET"}},providesTags:["folders"]}),updateFolder:e.mutation({query:function(e){var r=e.id,n=(0,t.Z)(e,o);return{url:"/folders/".concat(r),method:"PUT",body:n}},invalidatesTags:["folders"]}),uploadFile:e.mutation({query:function(e){var r=e.id,n=(0,t.Z)(e,l);return{url:"/folders/files/".concat(r),method:"POST",body:n}},invalidatesTags:["folders"]}),deleteAFile:e.mutation({query:function(e){return{url:"/folders/delete-files",body:{folderId:e.folderId,fileId:e.fileId},method:"POST"}},invalidatesTags:["folders"]}),deleteFolder:e.mutation({query:function(e){return{url:"/folders/".concat(e),method:"DELETE"}},invalidatesTags:["folders"]})}}}),a=d.useCreateFolderMutation,s=d.useGetFoldersQuery,u=d.useGetFolderByIdQuery,c=(d.useUpdateFolderMutation,d.useDeleteFolderMutation,d.useUploadFileMutation),f=d.useCreateNewFolderMutation,m=d.useDeleteAFileMutation}}]);
//# sourceMappingURL=669.44775f18.chunk.js.map