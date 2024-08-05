
import ConditionalComponent from "../_components/ConditionalComponent"
import { getUsers } from "../_services/apiGroups";

async function page() {
     const userInitial = await getUsers();
    console.log("userInitial", userInitial);
    return <ConditionalComponent userInitial={userInitial}/>
}
export default page
