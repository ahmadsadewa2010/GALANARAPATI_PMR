"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProviders";

import LoadingScreen from "@/components/ui/LoadingScreen";

interface Props{

allow:string[];

children:React.ReactNode;

}

export default function RoleGuard({

allow,

children,

}:Props){

const {

loading,

user,

}=useAuth();

const router=
useRouter();

useEffect(()=>{

if(
!loading&&
user&&
!allow.includes(user.role)
){

router.replace("/403");

}

},[
loading,
user
]);

if(loading){

return <LoadingScreen/>

}

if(!user){

return null;

}

if(
!allow.includes(user.role)
){

return null;

}

return children;

}