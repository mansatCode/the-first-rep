import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from "@/utilities/color";

export const icon = {
    index: (props: any) => <Ionicons name='home-outline' size={24} {...props} />,
    track: (props: any) => <MaterialCommunityIcons name='dumbbell' size={24} {...props} />,
    global: (props: any) => <Ionicons name='earth' size={24} {...props} />,
    settings: (props: any) => <Ionicons name='person-circle-outline' size={24} {...props} />
};

export const settingIcons = {
    bell: () => <Feather name='bell' size={24} color={Colors.WHITE} />,
    language: () => <Ionicons name='language' size={24} color={Colors.WHITE} />,
    ruler: () => <Entypo name='ruler' size={24} color={Colors.WHITE} />,
    location: () => <EvilIcons name='location' size={24} color={Colors.WHITE} />,
};