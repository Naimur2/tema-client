"use strict";(self.webpackChunktema_client=self.webpackChunktema_client||[]).push([[149],{7149:function(e,r,t){t.r(r),t.d(r,{default:function(){return p}});var a=t(1413),n=t(4165),i=t(5861),o=t(9439),s=(t(2791),t(5705)),l=t(9515),c=t(7721),u=t(7075),m=t(8007),d=t(7689),g=t(4303),f=t(8819),h=t(184);function p(){var e=(0,u.mn)(),r=(0,o.Z)(e,2),t=r[0],p=r[1].isLoading,x=(0,f.a)(),y=(0,o.Z)(x,2),T=y[0],v=y[1].isLoading,b=(0,d.s0)(),j=(0,s.TA)({initialValues:{name:"",color:"",score:0,image:void 0},onSubmit:function(){var e=(0,i.Z)((0,n.Z)().mark((function e(r){var a,i,o,s,l;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(a=new FormData).append("image",r.image),e.next=5,T(a).unwrap();case 5:return i=e.sent,o=i.data,s={name:r.name,color:r.color,score:r.score,image:null===o||void 0===o?void 0:o[0].fileUrl},e.next=10,t(s).unwrap();case 10:g.Z.fire({title:"Success",text:"Team created successfully",icon:"success"}),b(-1),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),g.Z.fire({title:"Error",text:(null===e.t0||void 0===e.t0||null===(l=e.t0.data)||void 0===l?void 0:l.message)||"Something went wrong",icon:"error"});case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(r){return e.apply(this,arguments)}}(),validationSchema:m.Ry({name:m.Z_().required("Required"),color:m.Z_().required("Required"),score:m.Z_().required("Required"),image:m.Z_().required("Required")})}),Z=j.getFieldProps,q=j.handleSubmit,_=j.setFieldValue,w=j.errors,N=j.touched;return(0,h.jsxs)("div",{className:"grid gap-4",children:[(0,h.jsx)("h2",{className:"text-2xl font-semibold leading-tight text-gray-800 dark:text-white",children:"Create Team"}),(0,h.jsxs)("form",{onSubmit:q,className:"mt-10",children:[(0,h.jsxs)("div",{className:"mb-4 flex flex-col",children:[(0,h.jsx)(l.__,{htmlFor:"name",children:"Team Name"}),(0,h.jsx)(l.oi,(0,a.Z)({id:"name",placeholder:"Enter team name",helperText:N.name&&w.name},Z("name")))]}),(0,h.jsxs)("div",{className:"mb-4 flex flex-col",children:[(0,h.jsx)(l.__,{htmlFor:"color",children:"Team color"}),(0,h.jsx)("input",(0,a.Z)({id:"color",placeholder:"Enter team color",className:"w-full  border border-gray-300 rounded-md h-10",type:"color"},Z("color"))),N.color&&w.color&&(0,h.jsx)("p",{className:"text-red-500",children:w.color})]}),(0,h.jsxs)("div",{className:"mb-4 flex flex-col",children:[(0,h.jsx)(l.__,{htmlFor:"score",children:"Team score"}),(0,h.jsx)(l.oi,(0,a.Z)((0,a.Z)({id:"score",placeholder:"Enter team score",helperText:N.score&&w.score},Z("score")),{},{type:"number"}))]}),(0,h.jsxs)("div",{className:"mb-4 flex flex-col",children:[(0,h.jsx)(l.__,{htmlFor:"image",children:"Team image"}),(0,h.jsx)("input",{className:"block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400",id:"file_input",type:"file",name:"image",accept:"image/*",onChange:function(e){_("image",e.currentTarget.files[0])}}),N.image&&w.image&&(0,h.jsx)("p",{className:"text-red-500",children:w.image})]}),(0,h.jsx)("div",{className:"mb-6 mt-20",children:(0,h.jsx)(l.zx,{type:"submit",className:"w-full lg:w-auto bg-primary-900 hover:bg-primary-700",children:"Create Team"})}),(0,h.jsx)(c.Z,{isLoading:p||v})]})]})}},7075:function(e,r,t){t.d(r,{FL:function(){return c},ad:function(){return m},j9:function(){return u},mn:function(){return s},rS:function(){return l}});var a=t(4925),n=t(2901),i=["id"],o=n.g.injectEndpoints({endpoints:function(e){return{createTeam:e.mutation({query:function(e){return{url:"/teams",method:"POST",body:e}},invalidatesTags:["teams"]}),getTeams:e.query({query:function(){return{url:"/teams",method:"GET"}},providesTags:["teams"]}),getTeamById:e.query({query:function(e){return{url:"/teams/".concat(e),method:"GET"}},providesTags:["teams"]}),updateTeam:e.mutation({query:function(e){var r=e.id,t=(0,a.Z)(e,i);return{url:"/teams/".concat(r),method:"PUT",body:t}},invalidatesTags:["teams"]}),deleteTeam:e.mutation({query:function(e){return{url:"/teams/".concat(e),method:"DELETE"}},invalidatesTags:["teams"]})}}}),s=o.useCreateTeamMutation,l=o.useGetTeamsQuery,c=o.useGetTeamByIdQuery,u=o.useUpdateTeamMutation,m=o.useDeleteTeamMutation},8819:function(e,r,t){t.d(r,{a:function(){return a}});var a=t(2901).g.injectEndpoints({endpoints:function(e){return{uploadImage:e.mutation({query:function(e){return{url:"/files/upload-image",method:"POST",body:e}}})}}}).useUploadImageMutation}}]);
//# sourceMappingURL=149.4470d7e0.chunk.js.map