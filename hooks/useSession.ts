import { useAuth }
from "@/providers/AuthProviders";

export function useSession(){

const {

user,

loading,

}=useAuth();

return{

user,

loading,

loggedIn:
!!user,

};

}