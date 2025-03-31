import Ionicons from "@expo/vector-icons/Ionicons";

export const icon = {
    index: (props: any) => <Ionicons  name='home-outline' size={24} {...props} />,
    track: (props: any) => <Ionicons  name='rocket-outline' size={24} {...props} />,
    global: (props: any) => <Ionicons  name='earth' size={24} {...props} />,
    settings: (props: any) => <Ionicons  name='person-circle-outline' size={24} {...props} />
}