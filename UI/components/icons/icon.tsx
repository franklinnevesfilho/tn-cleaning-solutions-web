import { IconProp } from "./iconProp";
import SignOutIcon from "./signOutIcon"; 

export default function Icon(props: IconProp) {
    switch(props.name) {
        case 'sign-out':
            return <SignOutIcon  {...props} />;
        default:
            return null;
    }
}